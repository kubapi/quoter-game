class Journalist {
  constructor() {
    this.pos = createVector(width/2, height/2);
    this.hashtags = [];
    this.angle = 0;
  }

  draw() {
    rectMode(CENTER);
    push();
    translate(this.pos.x, this.pos.y);
    this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    rotate(this.angle);
    image(journalistImg, 0, 0, 30, 30);
    pop();
    
    
    for (let hashtag of this.hashtags) {
      hashtag.draw();
      hashtag.update();
    }
    
    if (this.hashtags.length > 20) {
      this.hashtags.splice(0, 1);
    }
  }

  update() {
    
    let sidewaysSpeed = 0;
    let forwardSpeed = 0;
    if (keyIsDown(65)) {
      sidewaysSpeed = -2;
    }

    if (keyIsDown(68)) {
      sidewaysSpeed = 2;
    }

    if (keyIsDown(87)) {
      forwardSpeed = -2;
    }

    if (keyIsDown(83)) {
      forwardSpeed = 2;
    }
    
    this.pos.add(sidewaysSpeed, forwardSpeed);
  }

  shot(quote) {
    for (let i = this.hashtags.length - 1; i >= 0; i--) {
      if (dist(this.hashtags[i].x, this.hashtags[i].y, quote.pos.x, quote.pos.y) < 30) {
        this.hashtags.splice(i, 1);
        return true;
      }
    }
    return false;
  }
  
  shoot() {
    this.hashtags.push(new Hashtag(this.pos.x, this.pos.y, this.angle));
  }

  die(quote) {
    if (dist(this.pos.x, this.pos.y, quote.pos.x, quote.pos.y) < 5) {
      return true;
    }
    return false;
  }
}
