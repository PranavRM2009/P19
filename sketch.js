var PLAY = 1;
var END = 0;
var gameState = PLAY;

var skyImg, sky, invisibleSky ;
var sonic, SonicImg, jumping_sonic,sonic_collided
var platform, platformImg, platformGroup,gold,goldImg,goldGroup

var bomb,bombImg,bombGroup
var coin,coinImg,coinGroup,coins

var restart,restartImg
var gameOver,gameOverImg

var score;

function preload(){
    skyImg = loadImage("Picture 1.png");
    SonicImg = loadImage("Sonic -1.png");
    jumping_sonic = loadImage("jumpS.png")
    sonic_collided = loadImage("hurted sonic.png")

    platformImg = loadImage("clip.png");
    goldImg = loadImage("gold platform.png")

    bombImg = loadImage("bomb copy.png")
    coinImg = loadImage("coin copy.png")

    restartImg = loadImage("restart1.png")
    gameOverImg = loadImage("gameOver copy.png")
  }

function setup() {
    createCanvas(800,600)

    sky = createSprite(300,300);
    sky.addImage(skyImg);
    sky.scale = 0.4
    
  
    sonic = createSprite(400,300)
    sonic.addImage("sonic",SonicImg);
    sonic.addImage("sonicjumping",jumping_sonic);
    sonic.addImage("collided",sonic_collided);
    sonic.changeImage("sonic",SonicImg);
    sonic.scale=0.18 
  
    gameOver = createSprite(400,200);
    gameOver.addImage(gameOverImg);
  
    restart = createSprite(400,240);
    restart.addImage(restartImg);
    
    gameOver.scale = 0.5;
    restart.scale = 0.15 ;
    gameOver.visible = false;
    restart.visible = false;

    invisibleSky = createSprite(400,595,800,10);
    invisibleSky.visible = false;

    //sonic.debug=true
    sonic.setCollider("rectangle",0,0,125,sonic.height)
    
    platformGroup = new Group()
    bombGroup = new Group()
    coinGroup = new Group()
    goldGroup = new Group()

    score = 0;
    coins = 0

}

function draw() {
  background("black")
  textSize(25)
  fill('white')
  


   if(gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
    sky.velocityY = 2;
    if(sky.y > 450){
      sky.y = 300
    }
  
    if(keyDown("space")){
      sonic.velocityY=-13
      touches=[]
    }
  
    if(keyDown("left_arrow")){
      sonic.x=sonic.x+-3
    }
  
    if(keyDown("right_arrow")){
      sonic.x=sonic.x+3
    }
  
    if(platformGroup.isTouching(sonic)){
      sonic.velocityY=0
     }
     
  
    sonic.velocityY=sonic.velocityY+0.8
  
    spawnPlatform()
    spawnBomb()
    spawncoin()
    spawnGold()

    if(bombGroup.isTouching(sonic) || sonic.isTouching(invisibleSky)){
      gameState = END;
      sonic.x = 400
      sonic.y = 300
    }

    if(coinGroup.isTouching(sonic)){
      coins++
      coinGroup.destroyEach()
    }

    if(goldGroup.isTouching(sonic)){
      coins=coins+5
      goldGroup.destroyEach()
    }

  }
    else if(gameState=== END){
      gameOver.visible = true;
      restart.visible = true;
    
      sonic.changeImage("collided", sonic_collided);
       
      sky.velocityY = 0;
      sonic.velocityY = 0
      
     
     platformGroup.setLifetimeEach(-1);
     coinGroup.setLifetimeEach(-1);
     bombGroup.setLifetimeEach(-1);
     
     platformGroup.setVelocityYEach(0);
     coinGroup.setVelocityYEach(0); 
     bombGroup.setVelocityYEach(0); 

     if(mousePressedOver(restart)){
      reset()
      }
    }

    drawSprites()
    text("Score: "+ score, 500,50);
    text("Coins :"+coins,500,100)
    //console.log(gameState)
}

function spawnPlatform(){
    if(frameCount%200===0){
      platform = createSprite(300,-50)
      platform.addImage("platform",platformImg);
      platform.scale=0.3
    
      platform.x=Math.round(random(50,750))
      platform.velocityY=(3+score/100)
      platform.lifetime=600/3
      sonic.depth=platform.depth
      sonic.depth=sonic.depth+1
  
      platformGroup.add(platform) 
    }
  
  }

  function spawnBomb(){
    if(frameCount%250===0){
      bomb = createSprite(300,-50);
      bomb.addImage("bomb",bombImg);
      bomb.scale=0.1

      bomb.x=Math.round(random(50,750))
      bomb.velocityY=(3+score/100)

      bombGroup.add(bomb)

      bomb.lifetime=600/3 
     // bomb.debug = true
      bomb.setCollider("rectangle",0,0,600,bomb.height)

    }
  
  }
  function spawncoin(){
    if(frameCount%300===0){
      coin = createSprite(300,-50);
      coin.addImage("coin",coinImg);
      coin.scale= 0.5 

      coin.x=Math.round(random(50,750))
      coin.velocityY=(3+score/100)

      coinGroup.add(coin)

      coin.lifetime=600/3 
    }
  
  }

  function reset(){
    gameState = PLAY
    gameOver.visible=false
    restart.visible=false
  
    bombGroup.destroyEach()
    coinGroup.destroyEach()
    platformGroup.destroyEach()
    sonic.changeImage("sonic",SonicImg); 
    score = 0
  }
  

  function keyPressed(){
    if (keyCode===32){
      sonic.changeImage("sonicjumping",jumping_sonic) 
      
    }
  }

  function keyReleased(){
    if (keyCode===32){
      sonic.changeImage("sonic",SonicImg);
    }
  }

  function spawnGold(){
    if(frameCount%600===0){
      gold = createSprite(250,50)
      gold.addImage("gold",goldImg);
      gold.scale=0.1
    
      gold.x=Math.round(random(50,750))
      gold.velocityX=(7+score/100)
      gold.lifetime=500
      gold.depth=platform.depth
      gold.depth=sonic.depth+1
  
      goldGroup.add(gold) 
    }
  

  }