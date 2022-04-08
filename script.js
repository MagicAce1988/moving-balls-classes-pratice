const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

ctx.canvas.width = innerWidth;
ctx.canvas.height = innerHeight;

let particleArray;

// create constructor function

function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
  this.number = null;
}

// add draw method to particle prototype

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();

  if (!this.number) {
    this.number = parseInt(Math.random() * 69 + 1);
  }

  ctx.font = '30px Arial';

  const [r, g, b] = this.color.replace('rgb(', '').replace(')', '').split(',');

  //   choosing number color based on lumosity of particle background color

  var luma = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  if (luma < 100) {
    ctx.fillStyle = 'white';
  } else {
    ctx.fillStyle = 'black';
  }

  ctx.fillText(`${this.number}`, this.x - 15, this.y + 15);
};

// add update method to particle prototype

Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
  }

  this.x += this.directionX;
  this.y += this.directionY;

  this.draw();
};

// create particle array

function init() {
  particleArray = [];
  for (let i = 0; i < 68; i++) {
    let size = Math.random() * 20 + 30;
    let x = Math.random() * (innerWidth - size * 2) + size;
    let y = Math.random() * (innerHeight - size * 2) + size;
    let directionX = Math.random() * 5 + 0.5;
    let directionY = Math.random() * 5 + 0.5;
    let color = `rgb(${Math.random() * 255},${Math.random() * 255},${
      Math.random() * 255
    })`;

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// animation loop

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

init();
animate();

window.onresize = () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
};
