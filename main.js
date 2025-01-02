let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 800;
canvas.height = 800;
document.body.appendChild(canvas);

let backgoundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

let bulletList=[]
function Bullet(){
  this.x=0
  this.y=0
  this.init=function(){
    this.x=spaceshipX+18
    this.y=spaceshipY-10

    bulletList.push(this)
  }
  this.update=function(){
    this.y-=7
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
    bulletList[i].update()
  }
}

function render() {
  ctx.drawImage(backgoundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

  for(let i=0;i<bulletList.length;i++){
    ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y)
  }
}

function main() {
  render();
  requestAnimationFrame(main);
  update();
}
loadImage();
setupKeyboardListener();
main();
