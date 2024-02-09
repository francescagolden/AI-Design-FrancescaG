let cuberoot = 3;
let blockSize;
let cubes = [];
let trails = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  background(0);
  let len = min(width, height) * 0.8;
  blockSize = min(len, len, len) / cuberoot / 2; // Set the cube size to half of its current size
  for (let i = 0; i < cuberoot; i++) {
    for (let j = 0; j < cuberoot; j++) {
      for (let k = 0; k < cuberoot; k++) {
        let x = random(-len / 2, len / 2); // Random x position within the canvas
        let y = random(-len / 2, len / 2); // Random y position within the canvas
        let z = random(-len / 2, len / 2); // Random z position within the canvas
        let vx = random(-2, 2); // Random x velocity
        let vy = random(-2, 2); // Random y velocity
        let vz = random(-2, 2); // Random z velocity
        cubes.push(new Cube(x, y, z, blockSize, vx, vy, vz));
      }
    }
  }
}

function draw() {
  background(0, 10); // Lower opacity for the background to create a trail effect
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);

  for (let cube of cubes) {
    cube.update();
    cube.display();
    trails.push(createVector(cube.position.x, cube.position.y, cube.position.z)); // Store cube positions
  }

  // Draw the trails with decreasing opacity
  for (let i = trails.length - 1; i > 0; i--) {
    let alphaValue = map(i, 0, trails.length - 1, 255, 0); // Decreasing opacity
    noFill();
    stroke(255, alphaValue);
    beginShape();
    vertex(trails[i - 1].x, trails[i - 1].y, trails[i - 1].z);
    vertex(trails[i].x, trails[i].y, trails[i].z);
    endShape();
  }

  if (trails.length > 200) {
    trails.splice(0, 1); // Remove the oldest position to keep the trail length limited
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
