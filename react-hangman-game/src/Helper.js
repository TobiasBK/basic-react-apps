//this fx provides random 0 or 1 to flip the coin
function choice(arr){
    let randomIndex = Math.floor(Math.random() * arr.length);
    return arr[randomIndex];
}
export { choice };