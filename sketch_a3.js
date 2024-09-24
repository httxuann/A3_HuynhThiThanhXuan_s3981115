let angle = 0;  
let anxietyImg, joyImg, ennuiImg, disgustImg, fearImg, envyImg, embarrassmentImg, sadnessImg, angerImg; 
let girlImg; 
let stars = []; 
let shootingStars = []; 
let images = []; 
let imageLinks = []; 
let clouds = []; 

function preload() {
  anxietyImg = loadImage('assets/Anxiety.png');
  joyImg = loadImage('assets/Joy.png');
  ennuiImg = loadImage('assets/Ennui.png');
  disgustImg = loadImage('assets/Disgust.png');
  fearImg = loadImage('assets/Fear.png');
  envyImg = loadImage('assets/Envy.png');
  embarrassmentImg = loadImage('assets/Embarrassment.png');
  sadnessImg = loadImage('assets/Sadness.png');
  angerImg = loadImage('assets/Anger.png');
  girlImg = loadImage('assets/Girl.png');
  cloudImg1 = loadImage('assets/Cloud1.png');
  cloudImg2 = loadImage('assets/Cloud2.png');
  cloudImg3 = loadImage('assets/Cloud3.png');
  
  images = [anxietyImg, joyImg, ennuiImg, disgustImg, fearImg, envyImg, embarrassmentImg, sadnessImg, angerImg];
  imageLinks = [
    'anxiety.html', 'joy.html', 'ennui.html', 'disgust.html', 'fear.html', 
    'envy.html', 'embarrassment.html', 'sadness.html', 'anger.html'
  ];
  
  clouds.push(new Cloud(cloudImg1, 0, 100));
  clouds.push(new Cloud(cloudImg2, 700, 300));
  clouds.push(new Cloud(cloudImg3, 200, 500));
}

function setup() {
  let canvas = createCanvas(windowWidth, windowHeight);
  canvas.parent('canvas-container');
  noFill();
  
  for (let i = 0; i < 550; i++) {
    stars.push(new Star(random(width), random(height)));
  }

  for (let i = 0; i < 5; i++) { 
    shootingStars.push(new ShootingStar());
  }
}

function draw() {
  for (let i = 0; i <= height; i++) {
    let inter = map(i, 0, height, 0, 1);
    let c = lerpColor(color('#06032c'), color('#7f0c9f'), inter);
    stroke(c);
    line(0, i, width, i);
  }
  
  for (let cloud of clouds) {
    cloud.update();
    cloud.display();
  }

  for (let star of stars) {
    star.update();
    star.display();
  }

  for (let shootingStar of shootingStars) {
    shootingStar.update();
    shootingStar.display();
  }

  let centerX = width / 2;
  let centerY = height / 2;
  let ellipseWidth = 400; 
  let ellipseHeight = 400; 
  let radius = 250; 

  push(); 
  translate(centerX, centerY); 
  rotate(angle); 

  for (let i = 0; i < 20; i++) {
    let alpha = map(i, 0, 10, 40, 10); 
    stroke(219, 184, 205, alpha); 
    strokeWeight(30 - i); 
    ellipse(0, 0, ellipseWidth + i * 5, ellipseHeight + i * 5); 
  }
  
  stroke(219, 184, 205, 25); 
  strokeWeight(2); 
  ellipse(0, 0, ellipseWidth, ellipseHeight); 
  
  let numImages = images.length; 
  
  for (let i = 0; i < numImages; i++) {
    let angleOffset = TWO_PI / numImages * i; 
    let x = cos(angleOffset) * radius; 
    let y = sin(angleOffset) * radius; 
    
    imageMode(CENTER);
    image(images[i], x, y, 100, 95); 

    images[i].x = x;
    images[i].y = y;
    images[i].width = 100;
    images[i].height = 95;
    images[i].link = imageLinks[i];
  }

  pop(); 

  imageMode(CENTER);
  image(girlImg, width / 2, height / 2, 150, 150); 
  girlImg.x = width / 2;
  girlImg.y = height / 2;
  girlImg.width = 150;
  girlImg.height = 150;

  angle += 0.001; 
}

class Star {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = random(0.5, 2);
    this.alpha = random(100, 255);
  }

  update() {
    // Không cần cập nhật vị trí vì ngôi sao đứng im
  }

  display() {
    stroke(255, this.alpha);
    strokeWeight(this.size);
    point(this.x, this.y);
  }
}

class Cloud {
  constructor(img, x, y) {
    this.img = img;
    this.x = x;
    this.y = y;
    this.speed = random(0.5, 1); 
    this.amplitude = random(0.2, 0.5); 
    this.frequency = random(0.01, 0.03); 
    this.offset = random(TWO_PI); 
  }

  update() {
    this.x += this.speed;
    this.y += sin(this.offset + frameCount * this.frequency) * this.amplitude;
    
    if (this.x > width + this.img.width) {
      this.x = -this.img.width;
    }
  }

  display() {
    imageMode(CENTER);
    
    let sizeMultiplier;
    if (this.img === cloudImg1) {
      sizeMultiplier = 0.5; 
    } else if (this.img === cloudImg2) {
      sizeMultiplier = 0.65; 
    } else {
      sizeMultiplier = 1; 
    }

    image(this.img, this.x, this.y, this.img.width * sizeMultiplier, this.img.height * sizeMultiplier);
  }
}

class ShootingStar {
  constructor() {
      this.x = random(width);
      this.y = random(height);
      this.size = random(2, 5);
      this.alpha = random(100, 255);
      this.speed = random(2, 5);
      this.angle = random(TWO_PI);
      this.life = 255; 
  }

  update() {
      this.x += cos(this.angle) * this.speed;
      this.y += sin(this.angle) * this.speed;

      this.life -= 2;
      if (this.life <= 0) {
          this.life = 0;
      }
  }

  display() {
      stroke(255, this.life);
      strokeWeight(this.size);
      point(this.x, this.y);
  }
}

function mousePressed() {
  let numImages = images.length; 
  let radius = 250; 

  for (let i = 0; i < numImages; i++) {
    let angleOffset = TWO_PI / numImages * i + angle; 
    let x = cos(angleOffset) * radius + width / 2; 
    let y = sin(angleOffset) * radius + height / 2; 

    let distance = dist(mouseX, mouseY, x, y); 
    if (distance < 50) { 
      window.location.href = imageLinks[i]; 
      return;
    }
  }

  let distance = dist(mouseX, mouseY, girlImg.x, girlImg.y);
  if (distance < girlImg.width / 2) {
    window.location.href = 'index.html'; 
  }
}

