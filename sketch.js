var player , playerImage;
var ground , groundImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6 , obstacleImage;
var obstacle1Image , obstacle2Image , obstacle3Image ,
 obstacle3Image , obstacle4Image , obstacle6Image;
var coin , coinImage , coinSound;
var starCoin , starCoinImage;
var gameOver , gameOverImage;
var score;

function preload(){
  coinSound = loadSound("Sounds/coin.wav");
  playerImage = loadAnimation("mario1.png" , "mario2.png" , "mario3.png")
  groundImage = loadImage("Images/ground + copy.png");
  obstacle1Image = loadImage("Images/Obstacle 1.png");
  obstacle2Image = loadImage("Images/Obstacle 2.png");
  obstacle3Image = loadImage("Images/Obstacle 3.png");
  obstacle1Image = loadImage("Images/Obstacle 4.png");
  obstacle2Image = loadImage("Images/Obstacle 5.png");
  obstacle3Image = loadImage("Images/Obstacle 6.png");
  coinImage = loadImage("Images/Coin.png");
  starCoinImage = loadImage("Images/Star-Coin.png");
  gameOverImage = loadImage("Images/gameOver.png");
}

function setup() {
  createCanvas(600,300);
  player =  createSprite(50, 210, 20, 50);
  player.addAnimation("running" , playerImage);
  player.scale = 0.03;

  ground = createSprite(200 , 280 ,600 , 10);
  ground.addImage(groundImage);
 // ground.scale = 0.2 ;
  ground.velocityX = -2;
  score = 0;
}

function draw() {
  background("blue");
  text("Score : " + score , 180 , 30);
  if(ground.x < 0){
    ground.x = 200;
  }
  if(keyDown("UP_ARROW")){
    player.velocityX = -2;
  }
  if(obstaclesGroup.isTouching(player)){
    player.setVelocity(0);
   gameOver = createSprite(200,200);
   gameOverImage.addImage(gameOverImage);
   gameOver.scale = 0.1;
  }
  if (gamestate === PLAY ) {
    
    Coin();
    Obstacles();

  if (CoinGroup.isTouching(player)){
   
      coinGroup.destroyEach ();
      //coinSound.play();
    score = score + 1;
  }
   else{
        
  
   if (ObstacleGroup.isTouching(sword)){
     gamestate = END
     coinGroup.destroyEach();
     ObstacleGroup.destroyEach();
     //gameover sound
     sword.addImage(gameOverImage);
     sword.x = 200;
     sword.y = 200;
   }
  }}
  spawnObstacles();
  spawnCoins();
  drawSprites();
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
   obstacle.addImage(obstacleImage);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Image);
              break;
      case 2: obstacle.addImage(obstacle2Image);
              break;
      case 3: obstacle.addImage(obstacle3Image);
              break;
      case 4: obstacle.addImage(obstacle4Image);
              break;
      case 5: obstacle.addImage(obstacle5Image);
              break;
      case 6: obstacle.addImage(obstacle6Image);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}

function spawnCoins(){
  if (World.frameCount%80===0) {
    coin = createSprite (400 , 200 , 20 , 20);
    coin.scale = 0.2;
    //coin.debug = true;
    r= Math.round(random(1,4));
     if (r==1){
      coin.addImage(coin1Image);
     }else if (r==2){
       coin.addImage(starCoinImage);
     }else if (r==3){
       coin.addImage(coin3Image)
     }else if (r==4){
       coin.addImage (starCoinImage);
     }
    
    coin.y = Math.round (random(50 , 340));
    
    coin.velocityX = -7;
    coin.selLifetime = 100;
    
    coinGroup.add(coin);
  }
}