let star2 = []; 
const starColors = ['#FFA1F5', '#DFCCFB', '#F7FF8C'];
const brightnessChangeDelay = 500; 
let startTime;
let stars = [];
let backgroundImage; 
let planetImg; 
let planetX; 
let planetY; 
let planetSpeedY; 
let planetAmplitude; 
let planetOffsetY; 
let pulsatingSize = 70; 
let pulsatingSpeed = 0.1; 
let pulsatingDirection = 1; 
let minSize = 60; 
let maxSize = 80; 

function preload() {
    
    backgroundImage = loadImage('assets/homepage1.png');
    planetImg = loadImage('assets/Planet.png'); 
}

function setup() {
    let canvas = createCanvas(windowWidth, windowHeight);
    canvas.parent('canvas-container');
    
    startTime = millis(); 

    for (let i = 0; i < 400; i++) {
        stars.push(new Star(random(width), random(height)));
    }

    for (let i = 0; i < 12; i++) {
        star2.push({
            x: random(width),
            y: random(height),
            size: random(10, 25),
            color: random(starColors),
            angle: random(TWO_PI),  
            rotationSpeed: random(0.01, 0.03)  
        });
    }

    planetX = 30; 
    planetY = 50; 
    planetSpeedY = 0.5; 
    planetAmplitude = 20; 
    planetOffsetY = 0; 
}

function draw() {
    
    background(backgroundImage);

    for (let star of stars) {
        star.update();
        star.display();
    }

    // Vẽ các ngôi sao với hiệu ứng xoay
    for (let star of star2) {
        updateStar(star);
        drawStar(star);
    }

    drawTitle();

    planetOffsetY += planetSpeedY;
    if (planetOffsetY > planetAmplitude || planetOffsetY < -planetAmplitude) {
        planetSpeedY *= -1; 
    }

    let planetWidth = 250; 
    let planetHeight = 100;
    imageMode(CORNER);
    image(planetImg, planetX, planetY + planetOffsetY, planetWidth, planetHeight); 
}

function drawTitle() {
    pulsatingSize += pulsatingSpeed * pulsatingDirection;
    if (pulsatingSize > maxSize || pulsatingSize < minSize) {
        pulsatingDirection *= -1; 
    }

    textSize(pulsatingSize); 
    textFont('Courgette'); 
    textAlign(CENTER, CENTER); 
    fill(255); 
    text('Celestial Emotions', width / 2, height / 2);
}

function updateStar(star) {
    star.angle += star.rotationSpeed;
}

function drawStar(star) {
    push();
    translate(star.x, star.y);
    rotate(star.angle);
    noStroke();

    fill(star.color);
    
    let radius1 = star.size * 0.6;
    let radius2 = star.size * 0.4;
    let npoints = 5;
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;

    beginShape();
    for (let a = 0; a < TWO_PI; a += angle) {
        let sx = cos(a) * radius1;
        let sy = sin(a) * radius1;
        vertex(sx, sy);

        let cx = cos(a + halfAngle) * radius2;
        let cy = sin(a + halfAngle) * radius2;
        let nextX = cos(a + angle) * radius1;
        let nextY = sin(a + angle) * radius1;

        vertex(cx, cy);
    }
    endShape(CLOSE);
    pop();
}

class Star {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(1, 3);
        this.baseSize = this.size;
        this.alpha = random(150, 255);
        this.baseAlpha = this.alpha;
        this.sizeChangeSpeed = random(0.02, 0.1);
        this.alphaChangeSpeed = random(0.5, 1);
        this.sizeDirection = 1; 
        this.alphaDirection = 1; 
    }

    update() {
        this.size += this.sizeChangeSpeed * this.sizeDirection;
        if (this.size > this.baseSize * 1.5 || this.size < this.baseSize * 0.5) {
            this.sizeDirection *= -1;
        }

        this.alpha += this.alphaChangeSpeed * this.alphaDirection;
        if (this.alpha > 255 || this.alpha < 150) {
            this.alphaDirection *= -1;
        }
    }

    display() {
        noStroke();
        fill(255, 255, 255, this.alpha);
        ellipse(this.x, this.y, this.size);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
