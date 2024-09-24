let paintDrips = []; 
let slimyBlobs = []; 
let vegetableImages = []; 
let isDripsPaused = false; 
let paintImage; 
let particles = []; 
let showRect = false;
let buttonColor = '#d3c7d0'; 

function preload() {
    paintImage = loadImage('assets/painting04.png');
    for (let i = 1; i <= 4; i++) {
        vegetableImages.push(loadImage(`assets/vegetable${i}.png`));
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    noStroke();

    // Tạo các giọt sơn
    for (let i = 0; i < 10; i++) {
        paintDrips.push(new PaintDrip(random(width), random(-100, 100)));
    }

    // Tạo chất nhờn ma quái với hình ảnh rau củ
    for (let i = 0; i < 5; i++) {
        let imgIndex = int(random(0, vegetableImages.length));
        slimyBlobs.push(new SlimyBlob(-200, random(height), random(100, 200), vegetableImages[imgIndex]));
    }
}

function draw() {
    background(41, 135, 91); 

    // Hiển thị các vệt sơn
    for (let drip of paintDrips) {
        drip.display(); 
        if (!isDripsPaused) {
            drip.update(); 
        }
    }

    // Nếu giọt sơn dừng lại, chất nhờn ma quái bắt đầu di chuyển
    if (isDripsPaused) {
        for (let blob of slimyBlobs) {
            blob.update();
            blob.display();
        }
    }

    drawButton();

    if (showRect) {
        drawRectangle();
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

    let textContent = "Disgust is a powerful emotion that can motivate individuals to avoid harmful situations.\n" +
                      "Understanding its roots can help in navigating complex feelings and relationships.\n" +
                      "Embracing and managing disgust is essential for emotional well-being.";
    

    text(textContent, 140, 135, 210, 230);  
}

function mousePressed() {
    let d = dist(mouseX, mouseY, 50, 50);
    if (d < 50) { 
        showRect = !showRect; 
        buttonColor = showRect ? '#ffcc00' : '#d3c7d0'; 
    } else {
        isDripsPaused = !isDripsPaused; 
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
}

class PaintDrip {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.dripLength = 0;
        this.speed = 0.5; 
        this.maxDripLength = random(100, 200);
    }

    update() {
        this.dripLength += this.speed; 

        if (this.dripLength > this.maxDripLength) {
            this.dripLength = 0; 
            this.x = random(width); 
        }

        if (this.y + this.dripLength > height) {
            this.y = height - this.dripLength; 
        }
    }

    display() {
        let dripWidth = paintImage.width * 0.5; 
        let dripHeight = this.dripLength; 
        image(paintImage, this.x - dripWidth / 2, this.y + this.dripLength, dripWidth, dripHeight);
    }
}

class SlimyBlob {
    constructor(x, y, size, img) {
        this.x = x;
        this.y = y;
        this.size = size;
        this.img = img;
        this.speed = 1; 
    }

    update() {
        this.x += this.speed; 
        if (this.x > width + this.size) {
            this.reset(); 
        }
    }

    reset() {
        this.x = -this.size;
        this.y = random(height);
        this.speed = 1; 
        this.img = vegetableImages[int(random(0, vegetableImages.length))];
    }

    display() {
        let displayWidth = this.img === vegetableImages[3] ? this.size * 0.5 : this.size * 0.8; 
        let displayHeight = this.size / 1.2;

        image(this.img, this.x, this.y, displayWidth, displayHeight); 
    }
}
