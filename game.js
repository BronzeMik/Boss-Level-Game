let buttonColors = ['red', 'blue', 'green', 'yellow'];
let gamePattern = [];




function nextSequence() {
    randomNumber = Math.floor(Math.random() * 4);
    
    let randomChosencolor = randomNumber;
    
    gamePattern.push(randomChosenColor);
}
