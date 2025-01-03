let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);

let backgoundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let gameOver=false
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

let score=0;

let bulletList=[]
function Bullet(){
  this.x=0
  this.y=0
  this.init=function(){
    this.x=spaceshipX+18
    this.y=spaceshipY-10
    this.alive=true
    bulletList.push(this)
  }
  this.update=function(){
    this.y-=7
  }

  this.checkHit=function(){
    for(let i=0;i<enemyList.length;i++){
      if(this.y <= enemyList[i].y && this.x>=enemyList[i].x && this.x<=enemyList[i].x+48){
        score++;
        this.alive=false
        enemyList.splice(i,1);
      }
    }
    
  }
}
function generateRandomValue(min,max){
  let randomNum=Math.floor(Math.random()*(max-min+1))+min
  return randomNum
}

let enemyList=[]
function Enemy(){
  this.x=0
  this.y=0
  this.init=function(){
    this.y=0
    this.x=generateRandomValue(0,canvas.width-64)
    enemyList.push(this)
  }
  this.update=function(){
    this.y+=1
    if(this.y>=canvas.height-48){
      gameOver=true
      
    }
}
}
function loadImage() {
  backgoundImage = new Image();
  backgoundImage.src = "imgs/spaceback2.jpg";

  spaceshipImage = new Image();
  spaceshipImage.src = "imgs/spaceship.png";

  bulletImage = new Image();
  bulletImage.src = "imgs/bullet.png";

  enemyImage = new Image();
  enemyImage.src = "imgs/enemy.png";

  gameOverImage = new Image();
  gameOverImage.src = "imgs/gameover.png";
}

let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
  });
  document.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];

    if(event.keyCode==32){
      createBullet()
    }
  });
}

function createBullet(){
  let b=new Bullet()
  b.init()
}
function createEnemy(){
  const interval=setInterval(function(){
    let e=new Enemy()
    e.init()
  },1000)
}

function update() {
  if (39 in keysDown) {
    spaceshipX += 5;
  }
  if (37 in keysDown) {
    spaceshipX -= 5;
  }
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 64) {
    spaceshipX = canvas.width - 64;
  }
  for(let i=0;i<bulletList.length;i++){
    if(bulletList[i].alive){bulletList[i].update()
      bulletList[i].checkHit();
    }
    
  }
  for(let i=0;i<enemyList.length;i++){
    enemyList[i].update()
  }
 
}

function render() {
  ctx.drawImage(backgoundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
  ctx.fillText(`Score:${score}`,20,20)
  ctx.fillStyle="white"
  ctx.font="20px Arial"
  for(let i=0;i<bulletList.length;i++){
    if(bulletList[i].alive){
      ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y)
    }
  }
  for(let i=0;i<enemyList.length;i++){
    ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y)
  }
}

function main() {
  if(!gameOver){
  render();
  requestAnimationFrame(main);
  update();}
  else{
    ctx.drawImage(gameOverImage,300,300,150 ,100)
  }
}
loadImage();
setupKeyboardListener();
main();
createEnemy();
