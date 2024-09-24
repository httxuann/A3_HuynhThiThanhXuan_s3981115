let ghosts = []; 
let showRect = false; 
let buttonColor = '#d3c7d0'; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    
    for (let i = 0; i < 5; i++) {
        ghosts.push(new Ghost(random(width), random(-200, -50), random(50, 100)));
    }
}

function draw() {
    let innerColor = color('#5b2d8f'); 
    let outerColor = color('#9460b5'); 
    drawRadialGradient(width / 2, height / 2, dist(0, 0, width, height), innerColor, outerColor);
    
    for (let ghost of ghosts) {
        ghost.update();
        ghost.display();
    }

    if (showRect) {
        drawRectangle();
    }

    drawButton();
}

function drawRadialGradient(x, y, radius, innerColor, outerColor) {
    let stepCount = 100; 
    noStroke(); 
    for (let i = 0; i <= stepCount; i++) {
        let inter = map(i, 0, stepCount, 0, 1);
        let c = lerpColor(innerColor, outerColor, inter); 
        fill(c);
        ellipse(x, y, radius * (1 - i / stepCount), radius * (1 - i / stepCount)); 
    }
}

function drawButton() {
    fill(buttonColor);
    ellipse(50, 50, 60, 60); 

    // Hình tròn nhỏ hơn
    fill('#b92665'); 
    ellipse(50, 50, 50, 50); 

    // Hình tròn nhỏ nhất
    fill('#f59ac3'); 
    ellipse(50, 50, 40, 40); 

    // Vẽ ngôi sao
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

    let textContent = "Fear is a natural response to perceived threats.\n" +
                      "It can be a protective mechanism, but too much fear can hinder our ability to act.\n" +
                      "Understanding and addressing fear is essential for personal growth.";

    text(textContent, 140, 135, 210, 230); 
}

function mousePressed() {
    let d = dist(mouseX, mouseY, 50, 50);
    if (d < 50) { 
        showRect = !showRect; 
        buttonColor = showRect ? '#ffcc00' : '#d3c7d0'; 
    } else {
        for (let ghost of ghosts) {
            ghost.color = color(random(255), random(255), random(255), 150); 
            ghost.size = random(30, 150); 
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Ghost {
    constructor(x, y, size) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.speed = random(1, 3);
        this.color = color(200, 200, 255, 150); 
    }

    update() {
        this.y += this.speed; 
        if (this.y - this.size > height) {
            this.y = random(-200, -50); 
            this.x = random(width);
        }
    }

    display() {
        fill(this.color);
        beginShape();
        for (let angle = 0; angle < TWO_PI; angle += 0.1) {
            let xOff = cos(angle) * this.size;
            let yOff = sin(angle) * this.size * random(0.7, 1.3); 
            vertex(this.x + xOff, this.y + yOff);
        }
        endShape(CLOSE);
    }
}
