import React, {Component} from "react";
import Cell from "./Cell";
import './Board.css';


/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - hasWon: boolean, true when board is all off
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

class Board extends Component {
  static defaultProps = {
    nrows: 5,
    ncols: 5,
    chanceLightStartsOn:0.25
  };

  constructor(props) {
    super(props);

    //set initial state
    this.state = {hasWon:false, board:this.createBoard()};
    
  }

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */

  createBoard() {
    //creates a board (5x5)
    let board = [];
    for (let y=0; y<this.props.nrows; y++){
      let row = [];
      for( let x=0; x<this.props.ncols; x++){
        row.push(Math.random() < this.props.chanceLightStartsOn)
      }
      board.push(row);
    }
    return board
  }

  /** handle changing a cell: update board & determine if winner */

  flipCellsAround(coord) {
    //console.log("flip", coord)
    let {ncols, nrows} = this.props;
    let board = this.state.board;
    let [y, x] = coord.split("-").map(Number);


    function flipCell(y, x) {
      // if this coord is actually on board(valid on a 5x5), flip it
      if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
        board[y][x] = !board[y][x];
      }
    }
    // Flip Cell
    flipCell(y, x);
    //now flip neighbor cells
    flipCell(y, x-1); //flip lft
    flipCell(y, x+1); //flip rt
    flipCell(y-1, x); //flip below
    flipCell(y+1, x); //flip above

    // win when every cell is turned off
    let hasWon = board.every(row => row.every(cell => !cell));

    this.setState({board:board, hasWon:hasWon});
  }

  /** Render game board or winning message. */

  render() {
    // if the game is won, just show a winning msg & render nothing else
    if (this.state.hasWon){
      return <h1>Congrats! You've won!</h1>
    };

    // make table board
    let tblBoard = [];
    for(let y=0; y<this.props.nrows; y++){
      let row = [];
      for(let x=0; x<this.props.ncols; x++){
        let coord = `${y}-${x}`;
        row.push(
          <Cell 
            key={coord}
            isLit={this.state.board[y][x]}
            flipCellsAroundMe = {() => this.flipCellsAround(coord)}
          />
        );
        
      }
      tblBoard.push(<tr key={y}>{row}</tr>)
    }

    return(
      <div>
        <div className="board-title">
          <div className="neon-orange">The</div>
          <div className="neon-blue">Lights</div>
          <div className="neon-blue">Out</div>
          <div className="neon-orange">Game</div>
        </div>
        <table className="Board">
          <tbody>{tblBoard}</tbody>
        </table>
      </div>
      
    );
  }
}


export default Board;
