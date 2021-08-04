class Quiz {
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
      contestant = new Contestant();
      var contestantCountRef = await database.ref('contestantCount').once("value");
      if(contestantCountRef.exists()){
        contestantCount = contestantCountRef.val();
        contestant.getCount();
      }
      question = new Question()
      question.display();
    }
  }

  play(){
    //write code here to hide question elements
    question.hide();

    //write code to change the background color here
    background(234, 149, 240);

    fill(0);
    textSize(30);

    text("Result of the quiz", 340, 50)

    Contestant.getPlayerInfo();
    
    if(allContestants !== undefined){
      var display_answer = 230;
      fill("blue");
      text("Contestants who answered correct are in green color", 130, 230);
    }

    for(var plr in allContestants){
      var correct_answer = '2';
      if(correct_answer === allContestants[plr].answer){
        fill("green");
      }
      else{
        fill("red");
      }

      display_answer += 30;
      textSize(20);
      text(allContestants[plr].name + ":" + allContestants[plr].answer, 250, display_answer)

    }
    
    

    
    
  }

}
