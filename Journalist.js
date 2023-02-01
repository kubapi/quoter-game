class Journalist {
  constructor() {
    // I use createVector because it is easier to store later data using this method
    // I have discovered this method from here: https://p5js.org/reference/#/p5/createVector 
    // At the beginning of game journalist starts from the center of the board
    this.pos = createVector(width/2, height/2);
    this.hashtags = [];
    this.angle = 0;
  }

  draw() {
    
    push();
    // Move journalist to specifed position (in sketch.js it changes with update())
    translate(this.pos.x, this.pos.y);
    // Make sure that the player's angle (also shooting angle) is set to mouse position
    // To do this we can calculate atan2() which is described here: https://p5js.org/reference/#/p5/atan2
    // As written: The atan2() function is most often used for orienting geometry to the position of the cursor.
    this.angle = atan2(mouseY - this.pos.y, mouseX - this.pos.x);
    // Rotate the journalist image based on the cursor position
    rotate(this.angle);
    // Draw journalist image
    image(journalistImg, 0, 0, 30, 30);
    pop();
    
    // Loop responsible for updating and drawing the hashtags created by shoot function
    for (let hashtag of this.hashtags) {
      hashtag.draw();
      hashtag.update();
    }
    
    // Check whether number of hashtags is not too big
    // Without this it is very easy to overload the memory and crush the game
    if (this.hashtags.length > 20) {
      // If there are more than 20 hashtags, then delete the "oldest" one 
      this.hashtags.splice(0, 1);
    }
  }

  // Simple update function that reads pressed keys and updates using pos.add speed
  // This data is later translated to the position
  update() {
    // Speed for x and y axis later used to calculate the position
    let sidewaysSpeed = 0;
    let forwardSpeed = 0;
    // keyIsDown checks whether key is pressed
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
    // Add or subtract the speed value from x and y position
    this.pos.add(sidewaysSpeed, forwardSpeed);
  }

  // Function that check whether quote is hitted by hashtag by iterating over all hashtags and checking the collison
  shot(quote) {
    for (let i = this.hashtags.length - 1; i >= 0; i--) {
      // Creates simple "bounding box" around quote that allows to check whether hashtag hit quote.
      if (dist(this.hashtags[i].x, this.hashtags[i].y, quote.pos.x+100, quote.pos.y) < 100) {
        // If hit delete the hashtag
        this.hashtags.splice(i, 1);
        // By returning the true we later assess whether to delete the quote
        return true;
      }
    }
    return false;
  }
  
  // Function that adds new hashtag - it is later activated in sketch.js using left mouse click or space bar
  shoot() {
    this.hashtags.push(new Hashtag(this.pos.x, this.pos.y, this.angle));
  }

  // Function that checks whether journalist position is around the same as quote
  // If yes it return true and later game is restarted
  die(quote) {
    // Same as in shot(quote) - this time the bounding box is smaller 
    if (dist(this.pos.x, this.pos.y, quote.pos.x+100, quote.pos.y) < 25) {
      return true;
    }
    return false;
  }
}
