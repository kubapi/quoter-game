class Quote {
  constructor(speed, content) {
    this.x = random(width);
    this.y = random(height);

    this.content = content;

    
    if (random(1) > 0.5) {
      this.x += width;
    } else {
      this.x -= width;
    }
    
    if (random(1) > 0.5) {
      this.y += height;
    } else {
      this.y -= height;
    }
    this.pos = createVector(this.x, this.y);
    this.speed = speed;
    this.angle = 0;

  }

  draw() {
    angleMode(degrees);
    // rectMode(CENTER);
    push();
    textAlign(CENTER);
    textSize(8);
    textFont(myFont);
    fill('rgba(0,0,0, 1)');
    
    this.angle = atan2(journalist.pos.y - this.pos.y, journalist.pos.x - this.pos.x);
    text(this.content, this.pos.x, this.pos.y, 60, 60);
    rotate(this.angle);
    
    // fill(100, 255, 100);
    // image(quoteImg, 0, 0, 30, 30);
    
    pop();

    
  }
  
  update() {
    let difference = p5.Vector.sub(journalist.pos, this.pos);
    difference.limit(this.speed);
    this.pos.add(difference);
  }
  
}