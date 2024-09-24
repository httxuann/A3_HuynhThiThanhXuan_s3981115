let showRect = false; 
let buttonColor = '#d3c7d0'; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    colorMode(HSB);
    angleMode(DEGREES);
}

function draw() {
    let c1 = color('#790c08'); 
    let c2 = color('#dc6f0a'); 
    setGradient(0, 0, width, height, c1, c2, 1); 

    // Vẽ nhiều con mắt
    let eyeWidth = 70; 
    let eyeHeight = 40; 
    let spacing = 100; 
    let rows = floor(height / spacing) + 1; 
    let cols = floor(width / spacing);

    for (let i = 1; i < rows; i++) { 
        for (let j = 0; j < cols; j++) {
            let x = j * spacing + spacing / 2;
            let y = i * spacing + spacing / 2;
            drawEye(x, y, eyeWidth, eyeHeight);
        }
    }

    drawButton();

    if (showRect) {
        drawRectangle();
    }
}

function drawButton() {
    noStroke(); 
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

    let textContent = "Anxiety is a common emotion characterized by feelings of tension,\n" +
                      "worried thoughts, and physical changes like increased blood pressure.\n" +
                      "It can be beneficial in some situations, but when excessive,\n" +
                      "it can be overwhelming.";
    
    text(textContent, 140, 135, 210, 230); 
}

function mousePressed() {
    let d = dist(mouseX, mouseY, 50, 50);
    if (d < 50) { 
        showRect = !showRect; 
        buttonColor = showRect ? '#ffcc00' : '#d3c7d0'; 
    }
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

function drawEye(x, y, eyeWidth, eyeHeight) {
    let irisSize = 25; 
    let pupilSize = 10; 

    // Vẽ lòng trắng của mắt
    fill('#BAB4B4'); 
    stroke(0);
    strokeWeight(2);
    ellipse(x, y, eyeWidth, eyeHeight);

    // Vẽ iris
    fill('#8a3839'); 
    ellipse(x, y, irisSize, irisSize);

    let angle = atan2(mouseY - y, mouseX - x);
    let pupilX = x + cos(angle) * (eyeWidth / 4);
    let pupilY = y + sin(angle) * (eyeHeight / 4);

    // Vẽ con ngươi
    fill(0); 
    ellipse(pupilX, pupilY, pupilSize, pupilSize);

    // Vẽ highlight trong con ngươi
    fill('#BAB4B4'); 
    ellipse(pupilX - 3, pupilY - 3, 6, 6);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); 
}
