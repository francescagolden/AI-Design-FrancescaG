let cuberoot = 3;
let blockSize;
let cubes = [];
let trails = [];
let angleX = 0;
let angleY = 0;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let len = min(width, height) * 0.8;
  blockSize = min(len, len, len) / cuberoot / 2;
  for (let i = 0; i < cuberoot; i++) {
    for (let j = 0; j < cuberoot; j++) {
      for (let k = 0; k < cuberoot; k++) {
        let x = random(-len / 2, len / 2);
        let y = random(-len / 2, len / 2);
        let z = random(-len / 2, len / 2);
        let vx = random(-2, 2);
        let vy = random(-2, 2);
        let vz = random(-2, 2);
        cubes.push(new Cube(x, y, z, blockSize, vx, vy, vz));
      }
    }
  }
}

function draw() {
  background(0, 10);

  // Adjust the rotation angles based on the mouse position
  angleX = map(mouseY, 0, height, -PI / 2, PI / 2);
  angleY = map(mouseX, 0, width, -PI / 2, PI / 2);

  rotateX(angleX);
  rotateY(angleY);

  for (let cube of cubes) {
    cube.update();
    cube.display();
    trails.push(createVector(cube.position.x, cube.position.y, cube.position.z));
  }

  for (let i = trails.length - 1; i > 0; i--) {
    let alphaValue = map(i, 0, trails.length - 1, 255, 0);
    noFill();
    stroke(255, alphaValue);
    beginShape();
    vertex(trails[i - 1].x, trails[i - 1].y, trails[i - 1].z);
    vertex(trails[i].x, trails[i].y, trails[i].z);
    endShape();
  }

  if (trails.length > 200) {
    trails.splice(0, 1);
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class Cube {
  constructor(x, y, z, s, vx, vy, vz) {
    this.position = createVector(x, y, z);
    this.velocity = createVector(vx, vy, vz);
    this.s = s;
  }

  update() {
    this.position.add(this.velocity);

    if (this.position.x < -width / 2 || this.position.x > width / 2) {
      this.velocity.x *= -1;
    }

    if (this.position.y < -height / 2 || this.position.y > height / 2) {
      this.velocity.y *= -1;
    }

    if (this.position.z < -width / 2 || this.position.z > width / 2) {
      this.velocity.z *= -1;
    }
  }

  display() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    box(this.s);
    pop();
  }
}
