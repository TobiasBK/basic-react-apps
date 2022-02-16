import React, { Component } from "react";
import Joke from "./Joke.js"
import axios from "axios";
import uuid from "uuid/v4";
import "./BadJokes.css"

const BASE_API = "https://icanhazdadjoke.com/"; //html default, used JSON response

class BadJokes extends Component{
    static defaultProps = {
        numJokesToGet: 10 //number of jokes to get from API
      };
      constructor(props) {
        super(props);
        this.state = {
          jokes: JSON.parse(window.localStorage.getItem("jokes") || "[]"),//parse JSON or use array
          loading: false
        };
        this.seenJokes = new Set(this.state.jokes.map(j => j.text));
        console.log(this.seenJokes);
        this.handleClick = this.handleClick.bind(this);
      }
      componentDidMount() {
        if (this.state.jokes.length === 0) this.getJokes();
      }
      async getJokes() { //load jokes from API
        try { //use try so you can show errors if API breaks
          let jokes = [];
        //use while loop instead of for loop b/c need the option to filter out jokes that are already received (so you don't have duplicate jokes)
          while (jokes.length < this.props.numJokesToGet) {
            let res = await axios.get(BASE_API, {
              headers: { Accept: "application/json" }
            });
            let newJoke = res.data.joke;
            if (!this.seenJokes.has(newJoke)) {
              jokes.push({ id: uuid(), text: newJoke, votes: 0 }); //push jokes into our empty array. UUID b/c API doesn't come w ID
            } else {
              console.log("FOUND A DUPLICATE JOKE!");
              console.log(newJoke);
            }
          }
          this.setState(
            st => ({ //combine arrays
              loading: false,
              jokes: [...st.jokes, ...jokes]
            }),
            () =>
              window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
          );
        } catch (err) {
          alert(err);
          this.setState({ loading: false });
        }
      }
      handleVote(id, delta) {
        this.setState(
          st => ({
            jokes: st.jokes.map(j =>
              j.id === id ? { ...j, votes: j.votes + delta } : j
            )
          }),
          () =>
            window.localStorage.setItem("jokes", JSON.stringify(this.state.jokes))
        );
      }
      handleClick() {
        this.setState({ loading: true }, this.getJokes);
      }

    render(){
        //render loading icon
        if (this.state.loading) {
            return (
              <div className='JokeList-spinner'>
                <i className='far fa-8x fa-laugh fa-spin' />
                <h1 className='JokeList-title'>Loading...</h1>
              </div>
            );
          }
        let jokes = this.state.jokes.sort((a, b) => b.votes - a.votes);
        return(
            <div className='JokeList'>
                <div className='JokeList-sidebar'>
                <h1 className='JokeList-title'>
                    <span>Bad</span> Jokes
                </h1>
                <img src='https://assets.dryicons.com/uploads/icon/svg/8927/0eb14c71-38f2-433a-bfc8-23d9c99b3647.svg' alt='' />
                <button className='JokeList-getmore' onClick={this.handleClick}>
                    Fetch Jokes
                </button>
                </div>
                <div className='JokeList-jokes'>
                    {jokes.map(j => (
                        <Joke
                            key={j.id}
                            votes={j.votes}
                            text={j.text}
                            upvote={() => this.handleVote(j.id, 1)}
                            downvote={() => this.handleVote(j.id, -1)}
                        />
                    ))}
                </div>
            </div>
        )
    }
}


export default BadJokes;