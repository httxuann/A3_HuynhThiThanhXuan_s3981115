let particles = [];
let smokeParticles = []; 
let showRect = false; 
let buttonColor = '#d3c7d0';

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();
}

function draw() {
    background(0, 10); 


    drawButton();

    if (showRect) {
        drawRectangle();
    }

    for (let i = 0; i < 5; i++) {
        particles.push(new Particle(random(width), height));
    }

    for (let i = particles.length - 1; i >= 0; i--) {
        let p = particles[i];
        p.update();
        p.show();
        if (p.finished()) {
            particles.splice(i, 1); 
        }
    }

    for (let i = smokeParticles.length - 1; i >= 0; i--) {
        let s = smokeParticles[i];
        s.update();
        s.show();
        if (s.finished()) {
            smokeParticles.splice(i, 1); 
        }
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

    let textContent = "Anger is a normal emotion that arises when someone feels unfairly treated or threatened.\n" +
                      "It can spur constructive action, but if unchecked, it can breed bad habits and strain bonds with others.\n" +
                      "Embracing and comprehending rage is the first step toward healthy anger management.";
    
    text(textContent, 140, 135, 210, 230); 
}

function mousePressed() {
    let d = dist(mouseX, mouseY, 50, 50);
    if (d < 50) {
        showRect = !showRect; 
        buttonColor = showRect ? '#ffcc00' : '#d3c7d0'; 
    } else {
        for (let i = 0; i < 10; i++) {
            smokeParticles.push(new SmokeParticle(mouseX, mouseY));
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
}

class Particle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.vx = random(-1, 1); 
        this.vy = random(-3, -1); 
        this.alpha = 255;
        this.size = random(10, 30); 
        this.life = random(100, 200); 
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 255 / this.life; 
        this.life -= 1; 
    }

    show() {
        let colorStep = map(this.alpha, 0, 255, 0, 1);
        let fireColor = lerpColor(color('#FF4500'), color('#FFD700'), colorStep); 
        fill(fireColor.levels[0], fireColor.levels[1], fireColor.levels[2], this.alpha);
        ellipse(this.x, this.y, this.size * random(0.5, 1.5), this.size * random(0.5, 1.5));  
    }

    finished() {
        return this.alpha < 0 || this.life < 0; 
    }
}

class SmokeParticle {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.alpha = 255;
        this.size = random(20, 40); 
        this.life = random(100, 200); 
        this.vx = random(-0.5, 0.5); 
        this.vy = random(-1, -0.5); 
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;
        this.alpha -= 255 / this.life; 
        this.life -= 1; 
    }

    show() {
        fill(150, 150, 150, this.alpha); 
        ellipse(this.x, this.y, this.size); 
    }

    finished() {
        return this.alpha < 0 || this.life < 0;  
    }
}
