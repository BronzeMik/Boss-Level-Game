let buttonColors = ['red', 'blue', 'green', 'yellow'];

//Record computer generated color pattern
let gamePattern = [];

//Record user input
let userClickedPattern = [];

//Check if game has been started
let started = false;

//Track levels
let level = 0;

//Use keyboard key to start game
$('body').keypress(function() {
    if(!started) {
        nextSequence();
        $('h1').text('Level 0');
        started = true;
    }
    
})


//start game over function
function startOver() {
    level = 0;
    gamePattern = [];
    started = false;
}


//User button choice

$('.btn').on('click', function() {


    //Add user button choice to userClickedPattern array
    let userChosenColor = $(this).attr('id');
    userClickedPattern.push(userChosenColor);

    //play sound
    playSound(userChosenColor);
    //add flash animation
    animatePress(userChosenColor);

    //Check user answer against game pattern
    checkAnswer(userClickedPattern.length-1);   

})

//Check last user answer to game pattern
function checkAnswer(currentLevel) {
    //use index to check if current user answer equal current game pattern
    if(userClickedPattern[currentLevel] == gamePattern[currentLevel]){
        console.log('success');
        
        //Call nextSequence to continue game
        if(userClickedPattern.length == gamePattern.length) {
            setTimeout(function() {
            nextSequence();
            }, 1000)
        }
    } else{
        console.log('wrong')

        //sound if answer is wrong
        playSound('wrong')

        //body flash red if answer is wrong
        $('body').addClass('game-over');
        setTimeout(function() {
            $('body').removeClass('game-over');
        }, 200)

        //change heading if answer is wrong
        $("#level-title").text("Game Over, Press Any Key to Restart");

        //if user answered wrong, call start over function
        startOver()
    }
}


function nextSequence() {
    //reset userClickedPattern to an empty array for next attempt
    userClickedPattern = [];

    //increase level by 1
    level++;

    //change heading to increase level by one
    $('#level-text').text('Level ' + level);

    //generate random number for computer generated button choice
    randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColor = buttonColors[randomNumber];
    
    //add computer generated button choice to game pattern
    gamePattern.push(randomChosenColor);

    //flash animation for computer generated button choice
    $('#' + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    //call play sound for computer generated button choice sound
    playSound(randomChosenColor);


}

    



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $('.' + currentColor).addClass('pressed')

    setTimeout(function() {
        $('.' + currentColor).removeClass('pressed')
    }, 100)
}
