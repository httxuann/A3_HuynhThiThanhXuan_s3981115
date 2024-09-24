let bloomFactor = 0; 
let bloomFactorLeft = 0; 
let bloomFactorRight = 0; 
let showRect = false; 
let buttonColor = '#d3c7d0'; 

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop(); 
}

function draw() {
    let innerColor = color('#63c4c2');
    let outerColor = color('#5681A1');
    drawRadialGradient(width / 2, height / 2, dist(0, 0, width, height), innerColor, outerColor);
    
    // Vẽ chậu cây giữa
    drawPlant(width / 2, height / 2, bloomFactor);

    // Vẽ chậu cây bên trái 
    drawPlant(width / 4, height / 2, bloomFactorLeft); 

    // Vẽ chậu cây bên phải 
    drawPlant(3 * width / 4, height / 2, bloomFactorRight); 
    if (bloomFactorRight > 0) {
        drawSpiral(3 * width / 4, height / 2, bloomFactorRight);
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

    let textContent = "Envy is a powerful emotion that can motivate individuals to seek what others have.\n" +
                      "Understanding its roots can help in navigating complex feelings and relationships.\n" +
                      "Embracing and managing envy is essential for emotional well-being.";

    text(textContent, 140, 135, 210, 230); 
}


function mousePressed() {
    let d = dist(mouseX, mouseY, 50, 50);
    if (d < 50) { 
        showRect = !showRect; 
        buttonColor = showRect ? '#ffcc00' : '#d3c7d0'; 
    } 
}

function drawSpiral(x, y, bloom) {
    noFill();
    stroke(255, 0, 0, 150); 
    strokeWeight(4);
    
    let radius = 10 + bloom * 2; 
    let angleIncrement = 0.2;
    let maxSpiralLoops = 10;

    for (let i = 0; i < maxSpiralLoops * TWO_PI; i += angleIncrement) {
        let xOffset = radius * cos(i);
        let yOffset = radius * sin(i);
        point(x + xOffset, y + yOffset); 
        radius += 0.5; 
    }
}

function drawPlant(x, y, bloom) {
    // Vẽ cành cây
    stroke(101, 67, 33);
    strokeWeight(8);
    line(x, y + 160, x, y + 60);

    // Vẽ các nhánh
    let offsetY = 80; 
    line(x, y + 60 + offsetY, x - 50, y + 30 + offsetY); 
    line(x, y + 60 + offsetY, x + 50, y + 30 + offsetY); 

    // Vẽ thân chậu
    fill(139, 69, 19);
    beginShape();
    vertex(x - 60, y + 160);
    bezierVertex(x - 70, y + 160, x - 70, y + 210, x - 10, y + 210);
    vertex(x + 10, y + 210);
    bezierVertex(x + 70, y + 210, x + 70, y + 160, x + 60, y + 160);
    vertex(x + 60, y + 160);
    endShape(CLOSE);

    // Vẽ các lá
    drawWaterDropLeaf(x - 50, y + 30 + offsetY);
    drawWaterDropLeaf(x - 40, y + 40 + offsetY);
    drawWaterDropLeaf(x + 50, y + 30 + offsetY);
    drawWaterDropLeaf(x + 40, y + 40 + offsetY);

    // Vẽ hoa đào với hiệu ứng nở
    drawHibiscus(x, y, bloom); 

    // Vẽ bong bóng khi chậu bên trái nở
    if (bloom > 0 && x < width / 2) { 
        drawBubbles(x, y - 100, bloom); 
    }

    // Vẽ trái tim khi hoa nở
    if (bloom > 0 && x === width / 2) {
        drawHearts(x, y - 20, bloom); 
    }
}

function drawBubbles(x, y, bloom) {
    fill('#83C5BE');
    let bubbleSize = 30 + bloom / 2; 
    let bubbleOffset = 140 + bloom;
    
    let symbols = ['?', '!', '...']; 
    textSize(16 + bloom / 5); 
    y += 90; 

    for (let i = 0; i < 5; i++) {
        let angle = TWO_PI / 5 * i;
        let bubbleX = x + cos(angle) * bubbleOffset;
        let bubbleY = y + sin(angle) * bubbleOffset;
        
        ellipse(bubbleX, bubbleY, bubbleSize, bubbleSize); 
        fill(0);
        text(symbols[i % symbols.length], bubbleX - 8, bubbleY - 4); 
        fill('#83C5BE');
    }
}

function drawWaterDropLeaf(x, y) {
    noStroke();
    fill(34, 139, 34);
    beginShape();
    vertex(x, y);
    bezierVertex(x + 15, y - 30, x - 15, y - 30, x, y);
    endShape(CLOSE);
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

function drawHibiscus(x, y, bloom) {
    fill('#CB80AB');
    for (let i = 0; i < 5; i++) {
        let angle = TWO_PI / 5 * i;
        let xOffset = cos(angle) * (60 + bloom);
        let yOffset = sin(angle) * (50 + bloom);
        ellipse(x + xOffset, y + yOffset, 80 + bloom, 80 + bloom); 
    }
    fill('#E6D9A2');
    ellipse(x, y, 70 + bloom * 1.2, 70 + bloom * 1.2); 
}

function drawHearts(x, y, bloom) {
    fill('#16423C'); 
    let heartSize = 20 + bloom / 2; 
    let heartOffset = 100 + bloom; 

    for (let i = 0; i < 8; i++) {
        let angle = TWO_PI / 8 * i;
        let heartX = x + cos(angle) * heartOffset;
        let heartY = y + sin(angle) * heartOffset;
        drawHeart(heartX, heartY, heartSize);
    }
}

// Hàm vẽ trái tim
function drawHeart(x, y, size) {
    beginShape();
    vertex(x, y);
    bezierVertex(x - size / 2, y - size / 2, x - size, y + size / 4, x, y + size);
    bezierVertex(x + size, y + size / 4, x + size / 2, y - size / 2, x, y);
    endShape(CLOSE);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function mouseMoved() {
    let dCenter = dist(mouseX, mouseY, width / 2, height / 2);
    let dLeft = dist(mouseX, mouseY, width / 4, height / 2);
    let dRight = dist(mouseX, mouseY, 3 * width / 4, height / 2);
    
    if (dCenter < 100) {
        bloomFactor = 20; 
        bloomFactorLeft = 0; 
        bloomFactorRight = 0; 
    } else if (dLeft < 100) {
        bloomFactorLeft = 20; 
        bloomFactor = 0; 
        bloomFactorRight = 0; 
    } else if (dRight < 100) {
        bloomFactorRight = 20; 
        bloomFactor = 0; 
        bloomFactorLeft = 0; 
    } else {
        bloomFactor = 0; 
        bloomFactorLeft = 0; 
        bloomFactorRight = 0; 
    }
    
    redraw(); 
}
