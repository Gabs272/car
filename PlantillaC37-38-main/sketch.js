var canvas;
var backgroundImage;
var bgImg;
var database;
//Agregar la variable gameState 
var gameState; 
var form, player, game;
var playerCount;

var car1_Img, car2_Img; 
var car1, car2; 
// Especificar el array 
var cars = []
var track; 

var allPlayers;

var fuelImage, powerCoinImage;
var fuels, powerCoins;

function preload() {
  backgroundImage = loadImage("assets/background.png");
  car1_Img = loadImage("assets/car1.png"); 
  car2_Img = loadImage("assets/car2.png"); 
  track = loadImage("assets/track.jpg"); 

  fuelImage = loadImage("assets/fuel.png");
  powerCoinImage = loadImage("assets/goldCoin.png");

}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  database = firebase.database();
  
  // form = new Form(); 
  game = new Game(); 
  // Llamar a la funcion getState
  game.getState(); 
  game.start(); 
  bgImg = backgroundImage; 
  
}

function draw() {
  background(backgroundImage);

  if(playerCount=== 2){
    game.update(1); 
  }

  if(gameState === 1){
    //agregar los parentesis
    game.play(); 
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
