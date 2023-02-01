class Hashtag{
  // Hashtag constructor takes x,y and angle from Journalist when he shoots
  constructor(x, y, angle) {
    // x and y are used to set initial hashtag position
    this.x = x;
    this.y = y;
    this.angle = angle;
    // Speed of the hashtag is constant
    this.speed = 16;
  }
  
  // Draw function is responsible for showing hashtag on canvas
  draw() {
    // Starts new drawing set - all of the bellow commands apply from here until pop();
    push();
    // "Moves" the hashtag from it's current position to the new position passed as an argument
    // Translate calculates current x,y and passed x,y and returns final position
    translate(this.x, this.y);
    // Same as translate but for angle
    rotate(this.angle);
    // Draws image in p5.js canvas as explained here: https://p5js.org/reference/#/p5/image
    image(hashtagImg, 0, 0, 15, 15);
    // Closes drawing set
    pop();
  }
  
  // Update function calculates the position of the hashtag based current position trajectory of the hashtag using.
  // I use two different trigonometry function as explained here: https://p5js.org/examples/math-sine-cosine.html
  // This allows to ensure that hashtag moves in a linear manner until it meets the quote.
  update() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
  }
}