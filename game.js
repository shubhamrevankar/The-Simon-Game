
var buttonColours = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];


var started = false;

var level = 0;

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

$(".btn").click(function() {


  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);
  var lastIndex = userClickedPattern.length-1;

  if(!checkAnswer(lastIndex)){
    userClickedPattern = [];
    $("body").addClass("game-over");
    playSound("wrong");
    setTimeout(function () {
      $("body").removeClass("game-over");
    }, 200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

  if(lastIndex === level-1){
    userClickedPattern = [];
    setTimeout(nextSequence,1000);
  }
});

function nextSequence() {

  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);

}

function checkAnswer(currentlevel){
   if(gamePattern[currentlevel] === userClickedPattern[currentlevel]){
     return true;
   }
   else{
     return false;
   }
}

function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

function startOver(){
  level=0;
  gamePattern=[];
  started=false;
}
