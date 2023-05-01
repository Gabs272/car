class Player {
  constructor() {
   this.name = null; 
   this.index = null; 
   this.positionX = 0;
    //cambiar X por Y 
   this.positionY = 0; 
  }

  addPlayer(){
    var playerIndex = "players/player" + this.index;

    if(this.index === 1){
      this.positionX = width /2 -100;
    }
    else{
      this.positionX = width/2 +100
    }

    database.ref(playerIndex).set({
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    });
  }

  getDistance(){ 
    var playerDistanceRef = database.ref("players/player" + this.index); 
    playerDistanceRef.on("value", (data)=>{ 
      var data = data.val(); 
      this.positionX = data.positionX; 
      this.positionY = data.positionY 
    }); 
  }

  update(){
    var playerIndex = "players/player" + this.index;
    database.ref(playerIndex).update({
      //agregar name
      name: this.name,
      positionX: this.positionX,
      positionY: this.positionY
    });
  } 

  getCount(){
    var playerCountRef = database.ref("playerCount"); 
    playerCountRef.on("value", (data)=>{
      playerCount = data.val(); 
    })
  }

  //Recibe el parametro que va a actualizar, agregar count
  updateCount(count){
    database.ref("/").update({
      playerCount: count
    }); 
  }

  static getPlayersInfo(){
    var playerInfoRef = database.ref("players"); 
    playerInfoRef.on("value", (data)=>{
      allPlayers = data.val();
    })
  }
}
