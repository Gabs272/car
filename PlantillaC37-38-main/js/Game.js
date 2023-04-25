class Game {
  constructor(){

  }

  getState(){
    var gameStateRef = database.ref("gameState"); 
      gameStateRef.on("value", function(data){
      gameState = data.val(); 
    }); 
  }

  update(state){
    database.ref("/").update({
      gameState: state
    })
  }

  start(){
    // Cambios 
    player = new Player();

    // agregar playerCount 
    playerCount = player.getCount(); 

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 -50, height -100); 
    car1.addImage("car1", car1_Img); 
    car1.scale = 0.07; 

    car2 = createSprite(width / 2 +100, height -100); 
    car2.addImage("car2", car2_Img); 
    car2.scale = 0.07; 

    cars = [car1, car2]; 

    fuels = new Group();
    powerCoins = new Group();

    this.addSprites(fuels, 4, fuelImage, 0.02);

    this.addSprites(powerCoins, 18, powerCoinImage, 0.09)
  }

  addSprites(spriteGroup, numberofSprites, spriteImage, scale){
    for(var i = 0; i<numberofSprites; i++){
      var x,y;
      x = random(width / 2 +150, width / 2 -150);
      y = random(- height * 4.5, height-400);

      var sprite = createSprite(x,y);
      sprite.addImage("sprite", spriteImage);

      sprite.scale = scale;
      spriteGroup.add(sprite);
    }
  }

  handleElements(){
    form.hide(); 
    form.titleImg.position(40, 50); 
    form.titleImg.class("gameTitleAfterEffect"); 
  }
  play(){ 
    this.handleElements();
     Player.getPlayersInfo(); 
     if(allPlayers !== undefined){ 
      image(track, 0, -height*5, width, height*6);
      var index = 0; 
      for(var plr in allPlayers){ 
        var x = allPlayers[plr].positionX; 
        var y = allPlayers[plr].positionY; 
        cars[index].position.x = x; 
        cars[index].position.y = y; 
        index = index + 1; 

        if(index === player.index){
          stroke(10);
          fill("red");
          elipse(x,y,60,60);
        }
      
        this.handleFuel(index);
        this.handleCoin(index);

        camera.position.x = cars[index-1].position.x;
        camera.position.y = cars[index-1].position.y;
      } 
    } 
    if(keyIsDown(UP_ARROW)){ 
      player.positionY +=10; 
      player.update(); 
    } 
    drawSprites(); 
  }

  handleFuel(){
    cars[index-1].overlap(fuels, function(colector, colected){
      player.fuel = 185;
      colected.remove();
    })
  }

  handleCoin(){
    cars[index-1].overlap(powerCoins, function(colector, colected){
      player.score += 21;
      player.update();
      colected.remove();
    })
  }
  
}
