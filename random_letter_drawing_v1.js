let lastX, lastY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255);
  // Starting point for the first line
  lastX = width / 2;
  lastY = height / 2;
}

function draw() {
  // The drawing is handled in the keyPressed function
  noLoop();
}

function keyPressed() {
  if (key >= 'A' && key <= 'Z' || key >= 'a' && key <= 'z') {
    drawLineForKey(key.toUpperCase()); // Convert key to uppercase for consistency
  }
}

function drawLineForKey(key) {
  let newX, newY;

  // Calculate new line end point based on the key
  switch (key) {
    case 'A':
      newX = lastX + random(-50, 50);
      newY = lastY + random(-50, 50);
      break;
    case 'B':
      newX = lastX + random(-30, 30);
      newY = lastY + random(-30, 30);
      break;
    // Add cases for other letters
    default:
      newX = lastX + random(-10, 10);
      newY = lastY + random(-10, 10);
      break;
  }

  // Draw the line
  line(lastX, lastY, newX, newY);

  // Update lastX and lastY for the next line
  lastX = newX;
  lastY = newY;
}

// You can add more customization for each letter by defining additional cases in the switch statement.
