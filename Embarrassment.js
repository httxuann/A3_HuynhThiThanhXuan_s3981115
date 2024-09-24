let bubbles = []; 
let showRect = false; 
let buttonColor = '#d3c7d0'; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke(); 

    for (let i = 0; i < 50; i++) {
        bubbles.push(new Bubble(random(width), random(height), random(30, 80)));
    }
}

function draw() {
    drawRadialGradient(width / 2, height / 2, max(width, height), color('#d63593'), color('#EAB7E1'));

    for (let i = bubbles.length - 1; i >= 0; i--) {
        let bubble = bubbles[i];
        bubble.move();
        bubble.display();

        if (bubble.isPopped) {
            bubbles.splice(i, 1); 
        }
    }

    drawButton();

    if (showRect) {
        drawRectangle();
    }
}

function drawButton() {
    noStroke(); // Loại bỏ stroke cho tất cả các hình vẽ trong nút

    fill(buttonColor);
    ellipse(50, 50, 60, 60); 

    fill('#b92665'); 
    ellipse(50, 50, 50, 50); 

    fill('#f59ac3'); 
    ellipse(50, 50, 40, 40); 

    fill('#f1fefc'); 
    drawStar(50, 50, 12, 6); 
}


function drawStar(x, y, radius1, radius2) {
    beginShape();
    let angleOffset = -PI / 2; 
    for (let i = 0; i < 5; i++) {
        let angle = angleOffset + TWO_PI / 5 * i;
        let xOuter = cos(angle) * radius1 + x;
        let yOuter = sin(angle) * radius1 + y;
        vertex(xOuter, yOuter);

        angle += TWO_PI / 10; 
        let xInner = cos(angle) * radius2 + x;
        let yInner = sin(angle) * radius2 + y;
        vertex(xInner, yInner);
    }
    endShape(CLOSE);
}

function drawRectangle() {
    noStroke();
    fill('#d3c7d0');
    rect(100, 100, 300, 300, 10); 

    fill('#b92665');
    rect(120, 115, 260, 270, 10); 

    fill('#f59ac3');
    rect(135, 130, 230, 240, 10); 

    fill(0); 
    textSize(14); 
    textAlign(LEFT, TOP); 
    textFont('Righteous'); 

    let textContent = "Embarrassment can be a challenging emotion to navigate.\n" +
                      "Recognizing it is the first step towards managing it and understanding your feelings.\n" +
                      "Embracing vulnerability is essential for emotional growth.";
   
    text(textContent, 140, 135, 210, 230); 
}

function mousePressed() {
    for (let bubble of bubbles) {
        let d = dist(mouseX, mouseY, bubble.x, bubble.y);
        if (d < bubble.r) {
            bubble.pop(); 
        }
    }

    let d = dist(mouseX, mouseY, 50, 50);
    if (d < 50) { 
        showRect = !showRect; 
        buttonColor = showRect ? '#ffcc00' : '#d3c7d0'; 
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
}

class Bubble {
    constructor(x, y, r) {
        this.x = x;
        this.y = y;
        this.r = r;
        this.originalR = r; 
        this.xSpeed = random(-1, 1); 
        this.ySpeed = random(-1, 1); 
        this.acceleration = random(0.01, 0.05); 
        this.isPopped = false; 
    }

    move() {
        if (this.isPopped) {
            return;
        }

        this.x += this.xSpeed;
        this.y += this.ySpeed;

        this.xSpeed += random(-this.acceleration, this.acceleration);
        this.ySpeed += random(-this.acceleration, this.acceleration);

        if (this.x < 0 || this.x > width) this.xSpeed *= -1;
        if (this.y < 0 || this.y > height) this.ySpeed *= -1;
    }

    display() {
        if (this.isPopped) {
            fill(255, 0, 0, 100); 
            noStroke();
            ellipse(this.x, this.y, this.r * 2); 
            return;
        }

        fill(0, 50); 
        ellipse(this.x + this.r / 4, this.y + this.r / 2, this.r * 1.5, this.r * 0.75); 

        fill(112, 57, 236, 150); 
        noStroke();
        ellipse(this.x, this.y, this.r * 2); 

        let highlightX = this.x - this.r / 3; 
        let highlightY = this.y - this.r / 3; 
        fill(255, 200); 
        ellipse(highlightX, highlightY, this.r / 2, this.r / 2); 

        stroke(255, 100); 
        strokeWeight(2); 
        noFill();
        ellipse(this.x, this.y, this.r * 2); 
    }

    pop() {
        this.isPopped = true; 
    }
}

function drawRadialGradient(x, y, radius, innerColor, outerColor) {
    let stepCount = 100; 
    noStroke(); 
    for (let i = 0; i <= stepCount; i++) {
        let inter = map(i, 0, stepCount, 0, 1); 
        let c = lerpColor(innerColor, outerColor, inter); 
        fill(c);
        ellipse(x, y, radius * 2 * (1 - i / stepCount), radius * 2 * (1 - i / stepCount)); 
    }
}
