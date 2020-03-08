// By Arash Saifhashemi

/// <reference path="../node_modules/@types/p5/global.d.ts" />
let leftTopX = 0;
let leftTopY = 0;
let w = 1;
let precision = 10;
let maxPrecision = 20;
let minPrecision = 3;

let step = 1;
let time = 0;

let smallAxisSize = 80;
let bigAxisSize = 250;

function setup() {
  leftTopX = 0;
  leftTopY = 0;
  createCanvas(windowWidth, windowHeight);
  angleMode(DEGREES);
}

function draw() {
  clear();
  stroke(255, 255, 0);

  background(51);

  strokeWeight(w); // Default

  push();
  translate(windowWidth / 2, windowHeight / 2);
  // rotate(time);
  drawFour(bigAxisSize, smallAxisSize);
  pop();

  push();
  translate(windowWidth / 2, windowHeight / 2);
  // rotate(45);
  rotate(time);
  drawFour(bigAxisSize, smallAxisSize);
  pop();

  time++;
  if (time % 10 == 0) {
    precision += step;
    if (precision > maxPrecision || precision < minPrecision) {
      step = -step;
    }
  }
}

function drawFour(bigAxisSize, smallAxisSize) {
  drawXY(0, bigAxisSize, smallAxisSize);
  scale(-1, 1);
  drawXY(0, bigAxisSize, smallAxisSize);
  scale(1, -1);
  drawXY(0, bigAxisSize, smallAxisSize);
  scale(-1, 1);
  drawXY(0, bigAxisSize, smallAxisSize);
}

function drawXY(angle, bigAxisSize, smallAxisSize) {
  // The diagonal lines
  line(
    0,
    -bigAxisSize,
    bigAxisSize * Math.sin(Math.PI / 4),
    -bigAxisSize * Math.cos(Math.PI / 4)
  );
  line(
    bigAxisSize * Math.sin(Math.PI / 4),
    -bigAxisSize * Math.cos(Math.PI / 4),
    bigAxisSize,
    0
  );

  line(leftTopX, leftTopY, leftTopX, leftTopY - bigAxisSize);
  line(leftTopX, leftTopY, leftTopX + bigAxisSize, leftTopY);
  let startX = leftTopX;
  let startY = leftTopY - bigAxisSize;
  let endX = leftTopX + bigAxisSize / precision;
  let endY = leftTopY;

  for (let i = 0; i < precision; i++) {
    line(startX, startY, endX, endY);
    startY += bigAxisSize / precision;
    endX += bigAxisSize / precision;
  }

  // On the top
  ({ startX, startY, endX, endY } = DrawTopAndTopMirror(
    bigAxisSize,
    smallAxisSize,
    startX,
    startY,
    endX,
    endY
  ));

  push();
  rotate(90);
  // to the right
  ({ startX, startY, endX, endY } = DrawTopAndTopMirror(
    bigAxisSize,
    smallAxisSize,
    startX,
    startY,
    endX,
    endY
  ));
  pop();
}

function DrawTopAndTopMirror(
  bigAxisSize,
  smallAxisSize,
  startX,
  startY,
  endX,
  endY
) {
  push();
  stroke(255, 0, 0);

  line(
    leftTopX,
    leftTopY - bigAxisSize - smallAxisSize,
    leftTopX,
    leftTopY - bigAxisSize - 2 * smallAxisSize
  );
  line(
    leftTopX,
    leftTopY - bigAxisSize - smallAxisSize,
    leftTopX + smallAxisSize,
    leftTopY - bigAxisSize - smallAxisSize
  );
  startX = leftTopX;
  startY = leftTopY - bigAxisSize - 2 * smallAxisSize;
  endX = leftTopX + smallAxisSize / precision;
  endY = leftTopY - bigAxisSize - smallAxisSize;
  for (let i = 0; i < precision; i++) {
    line(startX, startY, endX, endY);
    startY += smallAxisSize / precision;
    endX += smallAxisSize / precision;
  }
  // top mirror
  line(
    leftTopX,
    leftTopY - bigAxisSize - smallAxisSize,
    leftTopX,
    leftTopY - bigAxisSize
  );
  startX = leftTopX + smallAxisSize;
  startY = leftTopY - bigAxisSize - smallAxisSize;
  endX = leftTopX;
  endY = leftTopY - bigAxisSize - smallAxisSize + smallAxisSize / precision;
  for (let i = 0; i < precision; i++) {
    line(startX, startY, endX, endY);
    endY += smallAxisSize / precision;
    startX -= smallAxisSize / precision;
  }
  pop();
  return { startX, startY, endX, endY };
}
