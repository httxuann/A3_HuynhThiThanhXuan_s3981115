let clouds = [
    { x: null, y: null, size: 120, alpha: 255, color: [255, 255, 255], showFace: false, offsetY: 0, speed: 0.6 }, 
    { x: null, y: null, size: 150, alpha: 255, color: [255, 255, 255], showFace: false, offsetY: 0, speed: 0.5 }, 
    { x: null, y: null, size: 120, alpha: 255, color: [255, 255, 255], showFace: false, offsetY: 0, speed: 0.7 }  
];

let showRect = false; 
let buttonColor = '#d3c7d0'; 


function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop(); 

    // Đặt vị trí đám mây
    clouds[0].x = width / 2 - 200;
    clouds[0].y = height / 2 - 50;
    
    clouds[1].x = width / 2 + 200;
    clouds[1].y = height / 2 - 100;
    
    clouds[2].x = width / 2;
    clouds[2].y = height / 2 + 200;
}

function draw() {
    let innerColor = color('#5E5A93'); 
    let outerColor = color('#A29ACB'); 
    drawRadialGradient(width / 2, height / 2, dist(0, 0, width, height), innerColor, outerColor);

    clouds.forEach(cloud => {
        cloud.offsetY += cloud.speed; 
        cloud.y += sin(cloud.offsetY) * 2; 

        fill(cloud.color[0], cloud.color[1], cloud.color[2], cloud.alpha);
        drawRealisticCloud(cloud.x, cloud.y, cloud.alpha);
        
        // Vẽ mặt cười 
        if (cloud.showFace) {
            if (cloud === clouds[0]) {
                drawBoredFace(cloud.x, cloud.y, cloud.size);  
            } else if (cloud === clouds[1]) {
                drawBoredFace2(cloud.x, cloud.y, cloud.size); 
            } else if (cloud === clouds[2]) {
                drawBoredFace3(cloud.x, cloud.y, cloud.size); 
            }
        }
    });
    drawButton();

    if (showRect) {
        drawRectangle();
    }
}
function drawButton() {
    noStroke(); 

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

    let textContent = "Feeling ennui is a state of listlessness and dissatisfaction arising from a lack of occupation or excitement.\n" +
                      "It’s important to find ways to engage yourself and bring some joy into your life.";
    
    text(textContent, 140, 135, 210, 230); 
}

function mousePressed() {
    let d = dist(mouseX, mouseY, 50, 50);
    if (d < 50) { 
        showRect = !showRect; 
        buttonColor = showRect ? '#ffcc00' : '#d3c7d0'; 
    }
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

function drawRealisticCloud(x, y, alpha) {
    noStroke();
    ellipse(x, y, 180, 90);        
    ellipse(x + 40, y - 10, 130, 100); 
    ellipse(x - 40, y - 10, 130, 100);  
    ellipse(x + 80, y, 120, 70);    
    ellipse(x - 80, y, 120, 70);    
    ellipse(x, y + 10, 140, 90);   

    ellipse(x + 50, y + 5, 70, 50); 
    ellipse(x - 50, y + 5, 70, 50); 
    ellipse(x + 70, y - 5, 60, 40); 
    ellipse(x - 70, y - 5, 60, 40); 
}

function drawBoredFace(x, y, size) {
    // Vẽ mắt lờ đờ, nửa mở
    let eyeOffsetX = size * 0.2;
    let eyeOffsetY = size * -0.1;
    let eyeSize = size * 0.15;
    
    fill(0); 
    noStroke();
    
    arc(x - eyeOffsetX, y + eyeOffsetY, eyeSize, eyeSize, 0, PI); 

    arc(x + eyeOffsetX, y + eyeOffsetY, eyeSize, eyeSize, 0, PI);

    // Vẽ mí mắt nửa che mắt
    stroke(0);
    strokeWeight(4);
    noFill();
    let eyelidOffset = size * 0.05;
    line(x - eyeOffsetX - eyeSize / 2, y + eyeOffsetY - eyelidOffset, x - eyeOffsetX + eyeSize / 2, y + eyeOffsetY - eyelidOffset); // Mí mắt trái
    line(x + eyeOffsetX - eyeSize / 2, y + eyeOffsetY - eyelidOffset, x + eyeOffsetX + eyeSize / 2, y + eyeOffsetY - eyelidOffset); // Mí mắt phải

    // Vẽ miệng thẳng ngang hoặc hơi cong xuống
    stroke(0);
    strokeWeight(4);
    noFill();
    let mouthWidth = size * 0.5;
    let mouthHeight = size * 0.05;
    arc(x, y + size * 0.2, mouthWidth, mouthHeight, 0, PI); // Miệng hơi cong xuống
    
    // Vẽ lông mày thẳng thể hiện cảm giác chán
    stroke(0);
    strokeWeight(3);
    line(x - eyeOffsetX - 20, y + eyeOffsetY - 20, x - eyeOffsetX + 20, y + eyeOffsetY - 20); // Lông mày trái
    line(x + eyeOffsetX - 20, y + eyeOffsetY - 20, x + eyeOffsetX + 20, y + eyeOffsetY - 20); // Lông mày phải
}

function drawBoredFace2(x, y, size) {
    // Vẽ mắt lờ đờ
    let eyeOffsetX = size * 0.2;
    let eyeOffsetY = size * -0.1;
    let eyeSize = size * 0.15;
    
    fill(0); // Màu đen cho mắt
    noStroke();
    
    // Mắt bên trái
    ellipse(x - eyeOffsetX, y + eyeOffsetY, eyeSize, eyeSize * 0.6);
    // Mắt bên phải
    ellipse(x + eyeOffsetX, y + eyeOffsetY, eyeSize, eyeSize * 0.6);

    // Vẽ miệng thẳng ngang hoặc hơi cong xuống
    stroke(0);
    strokeWeight(4);
    noFill();
    let mouthWidth = size * 0.5;
    let mouthHeight = size * 0.05;
    arc(x, y + size * 0.2, mouthWidth, mouthHeight, 0, PI); // Miệng hơi cong xuống
    
    // Vẽ lông mày thẳng thể hiện cảm giác chán
    stroke(0);
    strokeWeight(3);
    line(x - eyeOffsetX - 20, y + eyeOffsetY - 20, x - eyeOffsetX + 20, y + eyeOffsetY - 20); // Lông mày trái
    line(x + eyeOffsetX - 20, y + eyeOffsetY - 20, x + eyeOffsetX + 20, y + eyeOffsetY - 20); // Lông mày phải
}

function drawBoredFace3(x, y, size) {
    // Vẽ mắt mệt mỏi
    let eyeOffsetX = size * 0.2;
    let eyeOffsetY = size * 0.1; // Điều chỉnh để mắt có cảm giác buồn hơn
    let eyeSize = size * 0.15;

    fill(0); // Màu đen cho mắt
    noStroke();

    // Mắt bên trái
    ellipse(x - eyeOffsetX, y + eyeOffsetY, eyeSize, eyeSize * 0.8);
    // Mắt bên phải
    ellipse(x + eyeOffsetX, y + eyeOffsetY, eyeSize, eyeSize * 0.8);

    // Vẽ miệng cong xuống rõ ràng hơn
    stroke(0);
    strokeWeight(4);
    noFill();
    let mouthWidth = size * 0.5;
    let mouthHeight = size * 0.1; // Miệng rộng hơn
    arc(x, y + size * 0.25, mouthWidth, mouthHeight, 0, PI); // Miệng cong xuống nhiều hơn

    // Vẽ lông mày cong xuống thể hiện cảm giác chán nản
    stroke(0);
    strokeWeight(3);
    line(x - eyeOffsetX - 20, y + eyeOffsetY - 10, x - eyeOffsetX + 20, y + eyeOffsetY - 20); // Lông mày trái cong
    line(x + eyeOffsetX - 20, y + eyeOffsetY - 10, x + eyeOffsetX + 20, y + eyeOffsetY - 20); // Lông mày phải cong
}

function mouseMoved() {
    clouds.forEach(cloud => {
        let d = dist(mouseX, mouseY, cloud.x, cloud.y); // Tính khoảng cách từ chuột đến tâm đám mây
        if (d < 100) { // Nếu chuột gần đám mây
            cloud.color = [180, 180, 184]; // Đổi màu thành #B4B4B8
            cloud.alpha = 255; // Giữ alpha ở mức 255
            cloud.showFace = true; // Hiện mặt cười
        } else {
            cloud.color = [255, 255, 255]; // Đặt lại màu thành trắng
            cloud.alpha = 255; // Đặt lại alpha
            cloud.showFace = false; // Ẩn mặt cười
        }
    });
    redraw(); // Cập nhật lại canvas khi di chuột
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight); // Điều chỉnh kích thước canvas khi thay đổi kích thước cửa sổ
}
