// VARIABLE
var buttonColors=["green","red","yellow","blue"];
var gamePattern=[];
var userClickedPattern=[];

var started =false;
var level =0;

// CLICK DETECTOR
$(".btn").click(function(){
  var colorChosen = $(this).attr("id");
  userClickedPattern.push(colorChosen);

  playSound(colorChosen);
  animatePress(colorChosen);

  checkAnswer(userClickedPattern.length-1);
});

// KEYBOARD INPUT DETECTOR
$(document).keypress(function(){
  if(!started){
    $("#level-title").text("Level "+ level);
    nextSequence();
    started =true;
  }
});

// PLAY AUDIO
function playSound(colorChosen){
  var audio= new Audio("sounds/"+colorChosen+".mp3");
  audio.play();
}

// ANIMATION
function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100);
}

// NEXT SEQUENCE
function nextSequence(){
  userClickedPattern=[];
  level++;
  $("#level-title").text("Level " + level);
  var randomNo = Math.floor(Math.random()*4);
  var randomColor = buttonColors[randomNo];
  gamePattern.push(randomColor);

  $("#"+randomColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomColor);
}

// CHECK ANSWER
function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    if(userClickedPattern.length===gamePattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game Over, Press Any Key to Restart");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    startOver();
  }
}

// START OVER
function startOver(){
  level = 0;
  gamePattern = [];
  started = false;
}
