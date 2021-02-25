class Game {
  constructor(){}

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }
    car1 = createSprite(100,200);
    car2 = createSprite(300,200);
    car3 = createSprite(500,200);
    car4 = createSprite(700,200);
         //   0       1     2       3
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();
   
    Player.getPlayerInfo();

    if(allPlayers !== undefined){
     //cars index 
     var index = 0;
     var x=0;
     var y;
      for(var plr in allPlayers){
        index=index+1;
        x = x+200;
        y = displayHeight - allPlayers[plr].distance;
        //you will asssign x and y positions to the cars x and y positions
        //in the first position you have car2, but what about car1??
        //you should be assigning car1 to player1?
        //since its currently pointing to car2, we need to decrement the index correct?yes
// cars = [car1, car2, car3, car4];
        cars[index-1].x = x;
        cars[index-1].y = y;
      
        if(index === player.index){
          cars[index-1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y;

        }
      }
    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=50
      player.update();
    }
    drawSprites();
  }
  
}
