let stars = []; 
let shootingStars = []; 
let brush; 
let shootingStarInterval = 500; 
let lastShootingStarTime = 0; 
let shootingStarCount = 5; 
let showRect = false; 
let buttonColor = '#d3c7d0';

function setup() {
    createCanvas(windowWidth, windowHeight);
    let innerColor = color('#000000'); 
    let outerColor = color('#f6d652'); 
    drawRadialGradient(width / 2, height / 2, dist(0, 0, width, height), innerColor, outerColor);

    brush = new StarBrush();
}

function draw() {
    let innerColor = color('#000000'); 
    let outerColor = color('#f6d652'); 
    drawRadialGradient(width / 2, height / 2, dist(0, 0, width, height), innerColor, outerColor);

    if (millis() - lastShootingStarTime > shootingStarInterval) {
        for (let i = 0; i < shootingStarCount; i++) {
            let x = random(-width, width); 
            let y = random(-height, height); 
            let length = random(100, 300); 
            let speed = random(2, 7); 
            shootingStars.push(new ShootingStar(x, y, length, PI / 4, speed)); 
        }
        lastShootingStarTime = millis(); 
    }

    for (let i = shootingStars.length - 1; i >= 0; i--) {
        let shootingStar = shootingStars[i];
        shootingStar.update();
        shootingStar.display();

        if (shootingStar.alpha <= 0 || shootingStar.outOfCanvas()) {
            shootingStars.splice(i, 1);
        }
    }

    for (let star of stars) {
        star.display();
    }

    drawButton(); 
    if (showRect) {
        drawRectangle(); 
    }
}

function drawRadialGradient(x, y, radius, innerColor, outerColor) {
    let stepCount = 100; 
    noStroke(); 
    for (let i = 0; i <= stepCount; i++) {
        let inter = map(i, 0, stepCount, 0, 1);
        
        let c = lerpColor(innerColor, outerColor, pow(inter, 2)); 
        fill(c);
        ellipse(x, y, radius * (1 - i / stepCount), radius * (1 - i / stepCount)); 
    }
}

function drawButton() {
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

    let textContent = "Joy is a beautiful emotion to embrace.\n" +
                      "Celebrate the moments that bring you happiness.\n" +
                      "Sharing joy with others can enhance your experience.";
    
    text(textContent, 140, 135, 210, 230); 
}

function mouseDragged() {
    brush.draw(mouseX, mouseY);
}

function mouseReleased() {
    brush.stopDrawing();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
}

class Star {
    constructor(x, y, size, alpha) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.alpha = alpha;
    }

    display() {
        noStroke();
        fill(255, this.alpha); 
        this.drawStar(this.x, this.y, this.size, this.size / 2, 5); 
    }

    drawStar(x, y, radius1, radius2, npoints) {
        let angle = TWO_PI / npoints;
        let halfAngle = angle / 2.0;
        beginShape();
        for (let a = 0; a < TWO_PI; a += angle) {
            let sx = x + cos(a) * radius1;
            let sy = y + sin(a) * radius1;
            vertex(sx, sy);
            sx = x + cos(a + halfAngle) * radius2;
            sy = y + sin(a + halfAngle) * radius2;
            vertex(sx, sy);
        }
        endShape(CLOSE);
    }
}

class ShootingStar {
    constructor(x, y, length, angle, speed) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.alpha = 255;
        this.speed = speed;
        this.angle = angle; 
    }

    update() {
        this.x += cos(this.angle) * this.speed;
        this.y += sin(this.angle) * this.speed;
        this.alpha -= 5;
    }

    display() {
        noStroke();
        fill(255, this.alpha);
        ellipse(this.x, this.y, 20, 10); 
        
        let tailX1 = this.x - cos(this.angle) * this.length; 
        let tailY1 = this.y - sin(this.angle) * this.length;
        let tailX2 = this.x - cos(this.angle + QUARTER_PI) * 10; 
        let tailY2 = this.y - sin(this.angle + QUARTER_PI) * 10;
        let tailX3 = this.x - cos(this.angle - QUARTER_PI) * 10; 
        let tailY3 = this.y - sin(this.angle - QUARTER_PI) * 10;

        fill(255, this.alpha * 0.7); 
        triangle(tailX1, tailY1, tailX2, tailY2, tailX3, tailY3); 
    }

    outOfCanvas() {
        return this.x < 0 || this.x > width || this.y < 0 || this.y > height; 
    }
}

class StarBrush {
    constructor() {
        this.isDrawing = false;
    }

    startDrawing(x, y) {
        this.isDrawing = true;
        this.lastX = x;
        this.lastY = y;
    }

    draw(x, y) {
        if (this.isDrawing) {
            let size = dist(this.lastX, this.lastY, x, y) * 2; 
            let alpha = map(size, 0, width, 100, 255);
            let star = new Star(x, y, size / 10, alpha);
            stars.push(star); 

            this.lastX = x;
            this.lastY = y;
        }
    }

    stopDrawing() {
        this.isDrawing = false;
    }
}

function mousePressed() {
    brush.startDrawing(mouseX, mouseY);

    let d = dist(mouseX, mouseY, 50, 50);
    if (d < 30) { 
        showRect = !showRect; 
        buttonColor = showRect ? '#ffcc00' : '#d3c7d0'; 
    }
}

function mouseDragged() {
    brush.draw(mouseX, mouseY);
}

function mouseReleased() {
    brush.stopDrawing();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
}
