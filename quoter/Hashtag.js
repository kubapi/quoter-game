class Hashtag{
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.angle = angle;
    this.speed = 16;
  }
  
  
  draw() {
    rectMode(CENTER);
    push();
    translate(this.x, this.y);
    rotate(this.angle);
    fill(100, 255, 100);
    image(hashtagImg, 0, 0, 15, 15);
    pop();
  }
  
  update() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }
}