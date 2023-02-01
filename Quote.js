class Quote {
  constructor(speed, content) {
    // When creating a Quote I want it to appear in the random places 
    // The only constraint is that it has to spawn at the border of the canvas
    this.x = random(width);
    this.y = random(height);

    // Content used in text() later to be updated from the API data
    this.content = content;
    
    // Changes starting position to be outside of the bounds of the canvas in x axis
    if (random(1) > 0.5) {
      this.x += width*2/3;
    } else {
      this.x -= width*2/3;
    }
    // Changes starting position to be outside of the bounds of the canvas in y axis
    if (random(1) > 0.5) {
      this.y += height*2/3;
    } else {
      this.y -= height*2/3;
    }  
    // Create vector that allows for much easier distance calculation
    this.pos = createVector(this.x, this.y);

    // Creates position vector this way it is easier to calculate the distance between quote - player and quote - hashtag
    this.speed = speed;
    this.angle = 0;

  }

  draw() {
    push();
    textAlign(CENTER);
    textSize(14);
    // Loads my custom font
    textFont(myFont);
    // Set color of text to black
    fill('rgba(0,0,0, 1)');
    // Focus angle of the quote to move towards journalist (the same method I use with following cursor with journalist angle)
    this.angle = atan2(journalist.pos.y - this.pos.y, journalist.pos.x - this.pos.x);
    // Draw text based on added from API quote content
    text(this.content, this.pos.x, this.pos.y, 200, 200);
    // Rotate according to calculated angle
    rotate(this.angle);
    pop();
    
  }
  
  update() {
    // Substract the positions of quote and journalist to understand in which direction there should be change in x and y position
    let difference = p5.Vector.sub(journalist.pos, this.pos);
    // Limits the difference of the vector based on speed of the quote
    // If the difference is big than it will be limited so that quote will not jump quickly to journalist
    difference.limit(this.speed);
    this.pos.add(difference);
  }
  
}