let journalist;
let quotes = [];

let framesTillCreate = 150;
let frame = 0;
let speed = 2;
let score = 0;

let backgroundTechno;
let quotesContents = []

function loadQuotesContents (){
    // Making request to simple endpoint in order to retrive the quotes
    fetch('https://type.fit/api/quotes')
    .then(response => response.json())
    .then(function(data) {
      quotesContents.push(data)
    });
}
loadQuotesContents()

function preload() {
  soundFormats('mp3')
  backgroundTechno = loadSound('music/background-techno.mp3')

  // Font used in drawing elements on the canvas
  myFont = loadFont('assets/NeueHaasUnica-Bold.ttf');
}

function setup() {

  createCanvas(windowWidth, windowHeight);
  imageMode(CENTER);
  journalist = new Journalist();
  journalistImg = loadImage("assets/player.png");
  landImg = loadImage("assets/background.png");
  hashtagImg = loadImage("assets/hashtag.png")

  quotes.push(new Quote(random(speed), quotesContents[0][Math.floor(Math.random()*quotesContents[0].length)]['text']));

  backgroundMusic();
}

function draw() {
  image(landImg, 0, 0, width*2, height * 2);

  textAlign(CENTER);
  textSize(800);
  textFont(myFont);
  fill('rgba(255,255,255, 0.5)');
  text(score, width/2, height/2+250);

  frame++;
  journalist.draw();
  journalist.update();
  
  for (let i = quotes.length - 1; i >= 0; i--) {
    quotes[i].draw();
    quotes[i].update();

    // Check if quote is hit
    if (journalist.shot(quotes[i])) {
      quotes.splice(i, 1);
      score++;
    }

    // Check if quote hit journalist
    if (journalist.die(quotes[i])) {
      reset();
    }

    
  }
  
  if (frame > framesTillCreate && quotes.length < 300) {
    console.log('Here...')
    quotes.push(new Quote(random(speed), quotesContents[0][Math.floor(Math.random()*quotesContents[0].length)]['text']));
    frame = 0;
    if (framesTillCreate > 20) {
      framesTillCreate *= 0.95;
    }
  }
  
  if (frameCount % 1000 == 0) {
    speed+=0.1;
  }

}

function mouseClicked() {
  journalist.shoot();
}

function keyTyped() {
  if (keyCode === 32) {
    journalist.shoot();
  }
}

function backgroundMusic() {
  backgroundTechno.play();
  backgroundTechno.loop();
  backgroundTechno.setVolume(0.1);
  userStartAudio();
}