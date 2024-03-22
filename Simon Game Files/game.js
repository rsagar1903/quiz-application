var buttonColors = ["red","blue","green","yellow"]
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

$(document).keypress(function () { 
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(4*(Math.random()));
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);

}

$(".btn").click(function () { 
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
});

function checkAnswer(curretLevel){
    if (gamePattern[curretLevel] == userClickedPattern[curretLevel]) {
        if (gamePattern.length === userClickedPattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000);
        }
    }
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over!! Please try again , press any key to restart ");

        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}

function animatePress(currentColor){
    $(currentColor).addClass("pressed");
    setTimeout(function(){
        $(currentColor).removeClass("pressed");
    } , 100);
}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
