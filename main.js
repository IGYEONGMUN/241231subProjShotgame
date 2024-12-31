let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 500;
canvas.height = 600;
document.body.appendChild(canvas);

let backgoundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;
let spaceshipX = canvas.width / 2 - 32;
let spaceshipY = canvas.height - 64;

function loadImage() {
  backgoundImage = new Image();
  backgoundImage.src = "imgs/spaceback.avif";

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
  document.addEventListener("keyup", function () {
    delete keysDown[event.keyCode];
  });
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
}

function render() {
  ctx.drawImage(backgoundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main() {
  render();
  requestAnimationFrame(main);
  update();
}
loadImage();
setupKeyboardListener();
main();
