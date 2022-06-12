var buttonColours=["red","blue","green","yellow"];
var gamePattern=[];

var userClickedPattern = [];
var started= false;

var level=0;
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level " + level);
    nextSequence();
    started=true;
  }
});
$(".btn").click(function(){
  var userChosenColour=$(this).attr("id");
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
  if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
    } else {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 100);
      startOver();
    }
}
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  let rnumber=Math.floor(Math.random()*4);
  let randomChosenColour=buttonColours[rnumber];
  gamePattern.push(randomChosenColour);
  $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

function animatePress(colour){
  $("#"+colour).addClass("pressed");
  setTimeout(function(){
    $("#"+colour).removeClass("pressed");
  },100);
}

function startOver(){
  gamePattern=[];
  level=0;
  started=false;
}

function playSound(name){
  var audio= new Audio("sounds/"+name+".mp3");
  audio.play();
}
