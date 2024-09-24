let raindrops = []; 
let lightning = false; 
let lightningStartTime = 0; 
let lightningDuration = 0; 
let showRect = false; 
let buttonColor = '#d3c7d0'; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
    // Tạo giọt mưa
    for (let i = 0; i < 100; i++) {
        raindrops.push(new Raindrop(random(width), random(height)));
    }
}

function draw() {
    let c1 = color('#568ec2'); 
    let c2 = color('#21519d'); 
    setGradient(0, 0, width, height, c1, c2, 1); 

    let currentTime = millis();
    if (lightning && currentTime - lightningStartTime < lightningDuration) {
        drawLightning(); 
    } else {
        lightning = false; 
    }

    // Vẽ mưa
    for (let drop of raindrops) {
        drop.update();
        drop.show();
    }

    drawButton();

    if (showRect) {
        drawRectangle();
    }
}

function mousePressed() {
    let d = dist(mouseX, mouseY, 50, 50); 
    if (d < 30) { 
        showRect = !showRect; 
        buttonColor = showRect ? '#ffcc00' : '#d3c7d0'; 
        return; 
    }

    if (!lightning) {
        lightningStartTime = millis();
        lightningDuration = random(300, 700); 
        lightning = true; 
    }
    
    console.log(`Mouse X: ${mouseX}, Mouse Y: ${mouseY}`); 
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

    let textContent = "Sadness is a natural emotion that can occur in response to loss or disappointment.\n" +
                      "It can help us process experiences, but prolonged sadness can lead to depression.\n" +
                      "Understanding and addressing feelings of sadness is essential for emotional health.";
    
    text(textContent, 140, 135, 210, 230); 
}

function setGradient(x, y, w, h, c1, c2, axis) {
    noFill();
    if (axis === 1) { 
        for (let i = y; i <= y + h; i++) {
            let inter = map(i, y, y + h, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(x, i, x + w, i);
        }
    } else { 
        for (let i = x; i <= x + w; i++) {
            let inter = map(i, x, x + w, 0, 1);
            let c = lerpColor(c1, c2, inter);
            stroke(c);
            line(i, y, i, y + h);
        }
    }
}

function drawLightning() {
    let startX = random(width);
    let startY = random(height * 0.3); 
    let endX = random(width);
    let endY = random(height * 0.7); 
    let segments = int(random(5, 10)); 
    let segmentDuration = lightningDuration / segments; 

    for (let i = 0; i < segments; i++) {
        stroke(255, 255, 255, map(i, 0, segments - 1, 200, 0)); 
        strokeWeight(4); 
        noFill();

        let x1 = startX + random(-10, 10);
        let y1 = startY + random(-10, 10);
        let x2 = endX + random(-10, 10);
        let y2 = endY + random(-10, 10);

        line(x1, y1, x2, y2);

        startX = x2;
        startY = y2;
        endX += random(-30, 30);
        endY += random(10, 30);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
}

class Raindrop {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = random(15, 25); 
        this.speed = random(1, 3); 
        this.angle = random(-10, 10); 
        this.paintColor = random(['#256c96', '#78d7f4', '#408fb6']); 
    }

    update() {
        this.x += sin(radians(this.angle)) * this.speed; 
        this.y += cos(radians(this.angle)) * this.speed; 
        if (this.y > height || this.x > width || this.x < 0) {
            this.y = 0; 
            this.x = random(width);
        }
    }

    show() {
        fill(this.paintColor); 
        noStroke();
        this.drawPaintDrop(this.x, this.y, this.size, this.size * 2); 
    }

    drawPaintDrop(x, y, width, height) {
        beginShape();
        vertex(x, y + height / 2); 
        bezierVertex(x + width / 2, y + height / 2, x + width / 4, y - height / 4, x, y - height / 2); 
        bezierVertex(x - width / 4, y - height / 4, x - width / 2, y + height / 2, x, y + height / 2); 
        endShape(CLOSE);
    }
}

