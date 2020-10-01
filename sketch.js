//player and computer
var player, computer;

//ball
var ball;

//edges
var edges;

//score
var playerScore, compScore, score;
playerScore = 10;
compScore = 20;
score = 0;

//highscore
localStorage["PlayerHighscore"] = 0;
localStorage["CompHighscore"] = 0;

//gameState
var PLAY, END, START, gameState;
PLAY = 0;
START = 1;
END = 2;
gameState = START;

function setup() {
  createCanvas(400, 400);
  
  //Player sprite
  player = createSprite(390, 200, 10, 80);
  player.shapeColor = "blue";
  
  //Computer
  computer = createSprite(10, 200, 10, 80);
  computer.shapeColor = "red";
  
  //ball
  ball = createSprite(200, 200, 10, 10);
  ball.shapeColor = "yellow";
  
  //edges
  edges = createEdgeSprites();
}

function draw() {
  background(255);
  
  //Bounce offs
  ball.bounceOff(edges[3]);
  ball.bounceOff(edges[2]);
  ball.bounceOff(player);
  ball.bounceOff(computer);
  
  // serve
  if (keyDown("space") && gameState === START) {
    ball.velocityX = 2;
    ball.velocityY = 2;
    
    gameState = PLAY;
  }
  
  //score display
  textSize(15);
  fill("blue");
  text("Player Score: " + playerScore, 250, 30);
  text("Payer Highscore: " + localStorage["PlayerHighscore"], 250, 50);
  
  fill("red");
  text("Computer Score: " + compScore, 20, 30);
  text("Computer Highscore: " + localStorage["CompHighscore"], 20, 50);
  
  //net
  for(var i = 0; i < 400; i += 20) {
    line(200, i, 200, i+10);
  }
  
  if (gameState === PLAY) {
    //player control
    player.y = World.mouseY;
    
    //computer ai
    computer.y = ball.y;
    
    //adding computer scores
    if (ball.isTouching(edges[1])) {
      compScore += 1;
      score += 1;
      
      reset();
    }
    
    //adding player scores
    if (ball.isTouching(edges[0])) {
      playerScore += 1;
      score += 1;
      
      reset();
    }
    
    // increase difficulty
    if (score%5 === 0 && score > 0) {
      ball.velocityX += 1;
      ball.velocityY += 1;
    }
    
    // End game
    if (compScore === 20) {
      reset();
        
      ball.setVelocity(0, 0);
      
      textSize(20);
      text("GameOver computer wins!", 125, 250);
      
      gameState = END;
    }
    
    if (playerScore === 20) {
      reset();
      
      ball.setVelocity(0, 0);
      
      textSize(20);
      fill("blue");
      text("GameOver player wins!", 125, 250);
      
      gameState = END;
    }  
  }else if(gameState === END) {
    fill("yellow");
    text("Press R to restart", 125, 350);
    
    //resets the game
    if (keyDown("r")) {
      gameOverReset();
      gameState = START;
    }
  }
  
  // End game
  if (compScore === 20) {
    reset();
        
    ball.setVelocity(0, 0);
      
    textSize(20);
    fill("red");
    text("GameOver computer wins!", 125, 250);
      
    gameState = END;
  }
    
  if (playerScore === 20) {
    reset();
      
    ball.setVelocity(0, 0);
      
    textSize(20);
    fill("blue");
    text("GameOver player wins!", 125, 250);
      
    gameState = END;
  }
  
  drawSprites();
}

function reset() {
  ball.x = 200;
  ball.y = 200;
  
  player.y = 200;
  computer.y = 200;
}

function gameOverReset() {
  ball.x = 200;
  ball.y = 200;
  
  ball.setVelocity(0, 0);
  
  player.y = 200;
  computer.y = 200;
  
  //highscore
  if (localStorage["PlayerHighscore"] < playerScore) {
    localStorage["PlayerHighscore"] = playerScore;
  }
  
  if (localStorage["CompHighscore"] < compScore) {
    localStorage["CompHighscore"] = compScore;
  }
  
  //score reset
  playerScore = 0;
  compScore = 0;
  score = 0;
  
  console.log(localStorage["CompHighscore"]);
  console.log(localStorage["PlayerHighscore"]);
}