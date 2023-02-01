// Declaring variables with block scope
let journalist;
let score = 0;

let quotes = [];
let quotesContents = []

let framesTillCreate = 100;
let frame = 0;
let speed = 2;

let backgroundTechno;

// Function that fetches quotes data from type.fit API
function loadQuotesContents (){
    // Making request to simple endpoint in order to retrive the quotes
    fetch('https://type.fit/api/quotes')
    .then(response => response.json()) // Parse the response to json
    .then(function(data) {
      quotesContents.push(data) // Push response.json to quotes.contents
    });
}

//Called directly before setup(), the preload()
function preload() {
  // Function that load the quotes.contents
  loadQuotesContents()

  // Code that allows to process and load music into p5.js project
  soundFormats('mp3')
  backgroundTechno = loadSound('music/background-techno.mp3')

  // Font used in drawing elements on the canvas
  myFont = loadFont('assets/NeueHaasUnica-Bold.ttf');
}

function setup() {

  // Make canvas full screen
  createCanvas(windowWidth, windowHeight);
  // Set's the way we calculate the position of images
  // AS explained here: https://p5js.org/reference/#/p5/imageMode
  imageMode(CENTER);
  // Create new object of journalist - I will do it only once
  journalist = new Journalist();
  // Loads assets for journalist, background (here land) and hashtag
  journalistImg = loadImage("assets/player.png");
  landImg = loadImage("assets/background.png");
  hashtagImg = loadImage("assets/hashtag.png")

  // Before we create the quotes from "framesTillCreate" we add initial quote so that there is a quote at the beginning of the game
  quotes.push(new Quote(random(speed), quotesContents[0][Math.floor(Math.random()*quotesContents[0].length)]['text']));

  // Play music in the background as explained here: https://www.youtube.com/watch?v=uHNgkQsHLXQ
  backgroundMusic();
}

function draw() {
  // Draw the background
  image(landImg, 0, 0, width*2, height * 2);
  
  // Set's properties of the background text score
  textAlign(CENTER);
  textSize(800);
  textFont(myFont);
  // RGBa allows me to add transparency/opacity to the text
  fill('rgba(255,255,255, 0.5)');
  // Make text equal to the score and it's width half the screen
  // Next parameters move it to the center of the screen
  text(score, width/2, height/2+250);

  // Draw runs automatically at 60 fps so every second the frame count will go by 60
  frame++;

  // Each frame draw journalist and update his position based on the input from the player
  journalist.draw();
  journalist.update();
  
  // Each frame draw all of the quotes and update its position based on the journalist position
  for (let i = quotes.length - 1; i >= 0; i--) {
    quotes[i].draw();
    quotes[i].update();

    // Check if quote hit journalist by iterating over quotes positions
    if (journalist.die(quotes[i])) {
      // If journalist is hit by a quote then restart the game
      reset();
    }
    
    // Check if quote is hit by iterating over quotes positions
    if (journalist.shot(quotes[i])) {
      // If quote is hit by hashtag delete certain element with i index from quote array
      quotes.splice(i, 1);
      // If hit increment score by one
      score++;
    }
  }
  
  // Check if selected time has passed to create new quote
  // Also check if number of quotes has not passed 20 (performance issues if so)
  if (frame > framesTillCreate && quotes.length < 20) {
    // Create a new quote with random speed and random content collected from the API
    quotes.push(new Quote(random(speed), quotesContents[0][Math.floor(Math.random()*quotesContents[0].length)]['text']));
    // Frame here serves as a counter that changes in speed of 60 fps
    frame = 0; 
    if (framesTillCreate > 20) {
      // Makes quotes appear faster with each new spawn
      framesTillCreate *= 0.98;
    }
  }
  
  // If thousand frames passed (% represents modulo division) then increase the quotes overall speed
  // This mean that new quotes that will spawn will be much faster
  if (frameCount % 1000 == 0) {
    speed+=0.1;
  }

}

// Builtin function in p5.js that allows to check whether user clicked left mouse button
// If yes then calls shoot function to journalist
function mouseClicked() {
  journalist.shoot();
}
// Checks if user pressed space bar 
// 32 is ASCII code for space bar - if is pressed than shoots
function keyTyped() {
  if (keyCode === 32) {
    journalist.shoot();
  }
}

// Additional function that is responsible for playing background music
function backgroundMusic() {
  backgroundTechno.play();
  backgroundTechno.loop();
  backgroundTechno.setVolume(0.1);
  userStartAudio();
}