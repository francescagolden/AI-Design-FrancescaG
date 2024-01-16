let cuberoot = 3;
let blockSize;
let cubes = [];

// Define Tetris piece shapes
const tetrisShapes = [
  [
    [1, 1],
    [1, 1],
  ],
  [
    [1, 1, 1],
    [1, 0, 0],
  ],
  [
    [1, 1, 1],
    [0, 0, 1],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
  [
    [1, 1, 1],
    [0, 1, 0],
  ],
];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  let len = min(width, height) * 0.8;
  blockSize = (min(len, len, len) / cuberoot / 2) * 0.5; // Reduce the size by 50%
  for (let i = 0; i < cuberoot; i++) {
    for (let j = 0; j < cuberoot; j++) {
      for (let k = 0; k < cuberoot; k++) {
        let x = random(-len / 2, len / 2);
        let y = random(-len / 2, len / 2);
        let z = random(-len / 2, len / 2);
        let vx = random(-2, 2);
        let vy = random(-2, 2);
        let vz = random(-2, 2);

        // Randomly select a Tetris shape
        let shapeIndex = int(random(tetrisShapes.length));
        let shape = tetrisShapes[shapeIndex];

        cubes.push(new TetrisPiece(x, y, z, blockSize, vx, vy, vz, shape));
      }
    }
  }

  // Set a fixed camera position
  camera(0, 0, 500, 0, 0, 0, 0, 1, 0);
}

function draw() {
  background(0);

  for (let cube of cubes) {
    cube.update();
    cube.display();
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

class TetrisPiece {
  constructor(x, y, z, s, vx, vy, vz, shape) {
    this.position = createVector(x, y, z);
    this.velocity = createVector(vx, vy, vz);
    this.s = s;
    this.shape = shape;
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
    for (let i = 0; i < this.shape.length; i++) {
      for (let j = 0; j < this.shape[i].length; j++) {
        if (this.shape[i][j] === 1) {
          box(this.s);
        }
        translate(this.s, 0, 0);
      }
      translate(-this.shape.length * this.s, this.s, 0);
    }
    pop();
  }
}
