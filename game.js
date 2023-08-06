var buttonColours=["red","blue","green","yellow"];

var gamePattern=[];
var userClickedPattern=[];

var gameStart=false;
var level=0;

$(document).on("keydown touchstart",function(){
    if(!gameStart){
        $("#level-title").text("Level "+level);
        nextSequence();
        gameStart=true;
        
    }   
});

$(".btn").on("click",function(){
    var userChosenColour=$(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1);
    
});



function checkAnswer(currentLevel){
if( gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
} else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over, Press Any Key to Restart");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        startOver();
    }
}
function startOver(){
    level=0;
    gamePattern=[];
    gameStart=false;
    

}

function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);

    var ranum=Math.floor(Math.random()*3+1);
    var randomChosenColour=buttonColours[ranum];
    gamePattern.push(randomChosenColour);

    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
   playSound(randomChosenColour);
}

function animatePress(currentColour){
    $("#"+currentColour).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColour).removeClass("pressed");    
    },100);
}
function playSound(name){
    var sound=new Audio("./sounds/"+name+".mp3");
    sound.play();
}
