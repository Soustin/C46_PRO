var Plr, plrTop, plrDown, plrRight, plrLeft;
var Zombie;
var rightEdge, leftEdge;
var zombieGrp, zombieDL, zombieDR, zombieD;
var Plrhead;
var zomSound, vicSound;
var safeZone;
PLAY = 0;
END = 1;
var gameState = PLAY;

function preload(){
  plrTop = loadImage("Survivor faceTop.png");
  plrDown = loadImage("Survivor faceDown.png");
  plrRight = loadImage("Survivor faceLeft.png");
  plrLeft = loadImage("Survivor faceRight.png");

  zombieDL = loadImage("Zombie1DL.png");
  zombieDR = loadImage("Zombie1DR.png");
  zombieD = loadImage("Zombie1D.png");

  zomSound = loadSound("SpookyZombies.mp3");
  vicSound = loadSound("VictorySound.wav");

  safeZone1Img = loadImage("Circular park.png");
  safeZone2Img = loadImage("Rectangular park.jpg");
  safeZone3Img = loadImage("Square park.png");
  safeZone4Img = loadImage("Circular park.png");
  safeZone5Img = loadImage("Square park.png");

}

function setup() {
  createCanvas(800,400);

  rightEdge = createSprite(0, 200, 20, 400);
  leftEdge = createSprite(800, 200, 20, 400);

  safeZone1 = createSprite(700, 310, 150, 150);
  safeZone1.addImage(safeZone1Img);
  safeZone1.scale = 0.23;
  safeZone2 = createSprite(700, 100, 50, 150);
  safeZone2.addImage(safeZone2Img);
  safeZone2.scale = 0.3;
  safeZone3 = createSprite(500, 200, 100, 150);
  safeZone3.addImage(safeZone3Img);
  safeZone3.scale = 0.2;
  safeZone4 = createSprite(200, 350, 130, 300);
  safeZone4.addImage(safeZone4Img);
  safeZone4.scale = 0.23;
  safeZone5 = createSprite(100, 200, 80, 300);
  safeZone5.addImage(safeZone5Img);
  safeZone5.scale = 0.2;
    

  // Plrhead = createSprite(400, 200, 20, 20);
  // Plrhead.setColor("34, 32, 33");

  zombieGrp = new Group();

  
  Plr = createSprite(400, 300, 40, 40);
  Plr.addImage(plrTop);
}

function draw() {
  background(255, 223, 0);

  fill("red");
  stroke("black")
  textSize(20);
  text("I just made the gameStates and the zombies to bounce off the safeZones", 100, 20);

  // zomSound.play();
  // vicSound.play();

  if(gameState === PLAY){

    Plr.debug = true;

  // zombieGrp.collide(rightEdge);

  if(keyDown(UP_ARROW)){
    Plr.y -= 4;
    Plr.addImage(plrTop);
  }

  if(keyDown(DOWN_ARROW)){
    Plr.y += 4;
    Plr.addImage(plrDown);
  }

  if(keyDown(RIGHT_ARROW)){
    Plr.x += 4;
    Plr.addImage(plrRight);
  }

  if(keyDown(LEFT_ARROW)){
    Plr.x -= 4;
    Plr.addImage(plrLeft);
  }

  // zombieGrp.collide(rightEdge);
  // zombieGrp.collide(leftEdge);

  if(zombieGrp.isTouching(rightEdge)){
    zombieGrp.velocityX = Math.round(random(-1, -2));
  }

  if(zombieGrp.isTouching(leftEdge)){
    zombieGrp.velocityX = Math.round(random(1, 2));
  }

  if(zombieGrp.isTouching(Plr)){
    gameState = END;
  }
  
  zombieGrp.bounceOff(safeZone1);
  zombieGrp.bounceOff(safeZone2);
  zombieGrp.bounceOff(safeZone3);
  zombieGrp.bounceOff(safeZone4);
  zombieGrp.bounceOff(safeZone5);

}

if(gameState === END){
  zombieGrp.destroyEach();
  zombieGrp.setVelocityXEach(0);
  zombieGrp.setVelocityYEach(0);
}

  drawSprites();
  spawnZombie();
}

function spawnZombie(){
  if(frameCount%60 === 50){
    Zombie = createSprite(Math.round(random(0, 400)), Math.round(random(-20, -100)), 20, 20);
    Zombie.velocityY = 2;
    Zombie.velocityX = Math.round(random(-2, 2));
    Zombie.scale = 0.4;
    Zombie.setCollider("rectangle", -5, -5, 200, 200);
    Zombie.debug = true;

    if(Zombie.velocityX < 0){
      Zombie.addImage(zombieDL);
    }

    if(Zombie.velocityX > 0){
      Zombie.addImage(zombieDR);
    }

    if(Zombie.velocityX === 0){
      Zombie.addImage(zombieD);
    }

    zombieGrp.add(Zombie);
  }
}