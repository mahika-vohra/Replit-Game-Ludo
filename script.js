/* VARIABLES */
let bricks;
let gridSize = 32;
let restStopImg;
let startImg;
let dice;

let blockWidth = 50;
let blockHeight = 50;

let player1Path = new Array();
let player2Path = new Array();
let player3Path = new Array();
let player4Path = new Array();

let diceValues = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6,1, 2, 3, 4, 5, 6];
let player1Token;
let player1Location = 0;
let player2Token;
let player2Location = 0;
let player3Token;
let player3Location = 0;
let player4Token;
let player4Location = 0;
let activePlayer = 'A';

let player1Next = 'B';
let player2Next = 'C';
let player3Next = 'D';
let player4Next = 'A';

let player1Message;
let player2Message;
let player3Message;
let player4Message;

let waitingMsg = 'Waiting...';
let yourTurnMsg = 'Your Turn';

let rules;

/* PRELOAD LOADS FILES */
function preload() {
  restStopImg = loadImage("assets/asterisk.png");
  startImg = loadImage("assets/asterisk.png");
}

/* SETUP RUNS ONCE */
function setup() {
  new Canvas(2000, 760);

  constructRules();
  constructPlayerTokens();
  constructPlayer1TokensExt();
  constructPlayer2TokensExt();
  constructPlayer3TokensExt();
  constructPlayer4TokensExt();
  
  constructPlayer1Path();
  constructplayer2Path();
  constructplayer3Path();
  constructplayer4Path();

  constructMessage();

  let temp;

  let home = new Sprite();
  home.collider = 's';
  home.width = blockWidth * 3;
  home.height = blockHeight * 3;
  home.pos = { x: 6 * blockWidth + home.width / 2, y: 6 * blockHeight + home.height / 2 };
  home.color = 'tomato';
  home.stroke = 'black';
  home.strokeWeight = 8;


  let homePink = new Sprite();
  homePink.collider = 's';
  homePink.width = blockWidth * 6;
  homePink.height = blockHeight * 6;
  homePink.pos = { x: homePink.width / 2, y: homePink.height / 2 };
  homePink.color = 'pink';
  homePink.stroke = 'black';
  homePink.strokeWeight = 5;
  homePink.layer = 2;

  let homeYellow = new Sprite();
  homeYellow.collider = 's';
  homeYellow.width = blockWidth * 6;
  homeYellow.height = blockHeight * 6;
  homeYellow.pos = { x: (9 * blockWidth) + homeYellow.width / 2, y: homeYellow.height / 2 };
  homeYellow.color = 'yellow';
  homeYellow.stroke = 'black';
  homeYellow.strokeWeight = 5;
  homeYellow.layer = 2;

  let homeBlue = new Sprite();
  homeBlue.collider = 's';
  homeBlue.width = blockWidth * 6;
  homeBlue.height = blockHeight * 6;
  homeBlue.pos = { x: homeBlue.width / 2, y: (9 * blockHeight) + homeBlue.height / 2 };
  homeBlue.color = 'turquoise';
  homeBlue.stroke = 'black';
  homeBlue.strokeWeight = 5;
  homeBlue.layer = 2;

  let homeGreen = new Sprite();
  homeGreen.collider = 's';
  homeGreen.width = blockWidth * 6;
  homeGreen.height = blockHeight * 6;
  homeGreen.pos = { x: (9 * blockWidth) + homeGreen.width / 2, y: (9 * blockHeight) + homeGreen.height / 2 };
  homeGreen.color = 'green';
  homeGreen.stroke = 'black';
  homeGreen.strokeWeight = 5;
  homeGreen.layer = 2;


  restStopImg.resize(50, 50);

  for (let row = 0; row < 15; row++) {  // loop through rows
    for (let col = 0; col < 15; col++) {

      temp = new Sprite();
      temp.layer = 2;

      if ((row == 2 && col == 6) 
          || (row == 8 && col == 2) 
          || (row == 6 && col == 12)
          || (row == 12 && col == 8)) {
        temp.img = restStopImg;
      }

    if ((row == 6 && col == 1) 
        || (row == 1 && col == 8) 
        || (row == 8 && col == 13)
        || (row == 13 && col == 6)) {
        temp.img = startImg;
      }
      
      temp.collider = 's';
      temp.width = blockWidth;
      temp.height = blockHeight;
      temp.pos = { x: col * blockWidth + blockWidth / 2, y: row * blockHeight + blockHeight / 2 };


      if (row < 6) {
        if (col == 6) {
          temp.color = "pink";
        } else if (col == 7 || col == 8) {
          temp.color = "yellow";
        } else {
          temp.visible = false;
        }
      }

      if (row > 8) {
        if (col == 6 || col == 7) {
          temp.color = "turquoise";
        } else if (col == 8) {
          temp.color = "green";
        } else {
          temp.visible = false;
        }
      }

      if (col < 6) {
        if (row == 6 || row == 7) {
          temp.color = "pink";
        } else if (row == 8) {
          temp.color = "turquoise";
        } else {
          temp.visible = false;
        }
      }

      if (col > 8) {
        if (row == 6) {
          temp.color = "yellow";
        } else if (row == 7 || row == 8) {
          temp.color = "green";
        } else {
          temp.color = "beige";
        }
      }

      if (row > 5 && row < 9) {
        if (col > 5 && col < 9) {
          temp.visible = false;
        }
      }

      if ((row == 0 && col == 7) 
        || (row == 7 && col == 14) 
        || (row == 14 && col == 7)
        || (row == 7 && col == 0)) {
        temp.color = "white"
      }

    }
  }
   // Create dice
  dice = new Sprite(760 / 2 - 5, 760 / 2 - 5);
  dice.w = 50;
  dice.h = 50;
  dice.color = 'white';
  dice.collider = 's';
  dice.textSize = 50;
  dice.text = '6';

  resetGame();
}

/* DRAW LOOP REPEATS */
function draw() {
  clear();
  background('beige');

  drawPlayer1();
  drawPlayer2();
  drawPlayer3();
  drawPlayer4();
  // Check enter button
  if (dice.mouse.presses()) {
    rollDice();
  }
}
/* FUNCTIONS */

  function constructMessage (){
//    { x: homePink.width / 2, y: homePink.height / 2 };
    player1Message = new Sprite();
    player1Message.pos = { x: 150, y: 50 };
    player1Message.w = 100;
    player1Message.h = 40;
    player1Message.color = 'white';
    player1Message.collider = 's';
    player1Message.textSize = 20;
    player1Message.text = 'Your Turn';
    player1Message.layer = 5;

    
    player2Message = new Sprite();
    player2Message.pos = { x: 450 + 150, y: 50 };
    player2Message.w = 100;
    player2Message.h = 40;
    player2Message.color = 'white';
    player2Message.collider = 's';
    player2Message.textSize = 20;
    player2Message.text = waitingMsg;
    player2Message.layer = 5;

    
    player3Message = new Sprite();
    player3Message.pos = { x: 450 + 150, y: 50 + 450};
    player3Message.w = 100;
    player3Message.h = 40;
    player3Message.color = 'white';
    player3Message.collider = 's';
    player3Message.textSize = 20;
    player3Message.text = player2Message.text;
    player3Message.layer = 5;

    
    player4Message = new Sprite();
    player4Message.pos = { x: 150, y: 50 + 450};
    player4Message.w = 100;
    player4Message.h = 40;
    player4Message.color = 'white';
    player4Message.collider = 's';
    player4Message.textSize = 20;
    player4Message.text = player2Message.text;
    player4Message.layer = 5;

     // dice = new Sprite(width / 2 - 5, height / 2 - 5);
  }

function rollDice () {
    let diceValue = random(diceValues);
    dice.text = diceValue;

   // player1Location = player1Location + result;
    if (activePlayer == 'A') {
      player1Message.text = waitingMsg;
      player1Location = move(player1Location, diceValue);
      activePlayer = player1Next;
    } else if (activePlayer == 'B') {
      player2Message.text = waitingMsg;
      player2Location = move(player2Location, diceValue);
      activePlayer = player2Next;
    } else if (activePlayer == 'C') {
      player3Message.text = waitingMsg;
      player3Location = move(player3Location, diceValue);
      activePlayer = player3Next;
    } else {
      player4Message.text = waitingMsg;
      player1Message.text = yourTurnMsg;
      player4Location = move(player4Location, diceValue);
      activePlayer = player4Next;
     // let x1 = player4Path[player4Location].x;
     // let y1 = player4Path[player4Location].y;
      // dice.text = "(" + x1 + "," + y1 + ")";
    }
  }

function move(currentLocation, diceValue) {
  let newLoc = currentLocation + diceValue;
  if (newLoc == 56) {
    switch (activePlayer) {
      case 'A':
        player1Message.text = 'You Win!!!';
        player4Next = 'B';
        player2Message.text = yourTurnMsg;
        break;
      case 'B':
        player2Message.text = 'You Win!!!';
        player1Next = 'C';
        player3Message.text = yourTurnMsg;
        break;
      case 'C':
        player3Message.text = 'You Win!!!';
        player2Next = 'D';
        player4Message.text = yourTurnMsg;
        break;
      default:
        player4Message.text = 'You Win!!!';
        player3Next = 'A';
        player1Message.text = yourTurnMsg;
    }
  } else {
    switch (activePlayer) {
      case 'A':
        player2Message.text = yourTurnMsg;
        break;
      case 'B':
        player3Message.text = yourTurnMsg;
        break;
      case 'C':
        player4Message.text = yourTurnMsg;
        break;
      default:
        player1Message.text = yourTurnMsg;
    }
  }
//  dice.text = newLoc;
  if (newLoc > 56) {
    return currentLocation;
  } else {
    return newLoc;
  }
}

function resetGame() {
  player1Location = 0;
  drawPlayer1();
  player2Location = 0;
  drawPlayer2();
  player3Location = 0;
  drawPlayer3();
  player4Location = 0;
  drawPlayer4();
}

function drawPlayer1()  {
  let x1 = player1Path[player1Location].x;
  let y1 = player1Path[player1Location].y;

  player1Token.pos = { x: x1 * blockWidth + blockWidth / 2, y: y1 * blockHeight + blockHeight / 2 };
}

function drawPlayer2()  {
  let x1 = player2Path[player2Location].x;
  let y1 = player2Path[player2Location].y;

  player2Token.pos = { x: x1 * blockWidth + blockWidth / 2, y: y1 * blockHeight + blockHeight / 2 };
}

function drawPlayer3()  {
  let x1 = player3Path[player3Location].x;
  let y1 = player3Path[player3Location].y;
  player3Token.pos = { x: x1 * blockWidth + blockWidth / 2, y: y1 * blockHeight + blockHeight / 2 };
}

function drawPlayer4()  {
  let x1 = player4Path[player4Location].x;
  let y1 = player4Path[player4Location].y;

  player4Token.pos = { x: x1 * blockWidth + blockWidth / 2, y: y1 * blockHeight + blockHeight / 2 };
}

function constructRules() {
  rules = new Sprite(940, 760/2);
  rules.w = 400;
  rules.h = 760;
  rules.color = 'white';
  rules.collider = 's';
  rules.textSize = 23;
  rules.text = 'Directions:\n\n 1. You need 4 players to play\n the game.\n\n 2. Each player will take turns\n rolling the dice by clicking\n the icon in the center\n of the board.\n\n 3.The first player to move\n their piece home will win!';
}
function constructPlayerTokens(){
  player1Token = new Sprite();
  player1Token.layer = 5;
	player1Token.diameter = 40;
  player1Token.color = 'pink';
  player1Token.strokeWeight = 5;
  player1Token.text = 1;
  player1Token.textSize = 20; 

  player2Token = new Sprite();
  player2Token.layer = 5;
	player2Token.diameter = 40;
  player2Token.color = 'yellow';
  player2Token.strokeWeight = 5;
  player2Token.text = 1;
  player2Token.textSize = 20; 

  player3Token = new Sprite();
  player3Token.layer = 5;
	player3Token.diameter = 40;
  player3Token.color = 'green';
  player3Token.strokeWeight = 5;
  player3Token.text = 1;
  player3Token.textSize = 20; 

  player4Token = new Sprite();
  player4Token.layer = 5;
	player4Token.diameter = 40;
  player4Token.color = 'turquoise';
  player4Token.strokeWeight = 5;
  player4Token.text = 1;
  player4Token.textSize = 20; 
}

function constructPlayer1TokensExt(){
  let player1TokenB = new Sprite();
  player1TokenB.layer = 5;
	player1TokenB.diameter = 40;
  player1TokenB.color = 'pink';
  player1TokenB.strokeWeight = 2;
  player1TokenB.text = 2;
  player1TokenB.textSize = 20; 
  player1TokenB.collider = 's';
  player1TokenB.pos = { x: 1 * blockWidth + blockWidth / 2, y: 2 * blockHeight + blockHeight / 2 };

  let player1TokenC = new Sprite();
  player1TokenC.layer = 5;
	player1TokenC.diameter = 40;
  player1TokenC.color = 'pink';
  player1TokenC.strokeWeight = 2;
  player1TokenC.text = 3;
  player1TokenC.textSize = 20; 
  player1TokenC.collider = 's';
  player1TokenC.pos = { x: 4 * blockWidth + blockWidth / 2, y: 2 * blockHeight + blockHeight / 2 };

  let player1TokenD = new Sprite();
  player1TokenD.layer = 5;
	player1TokenD.diameter = 40;
  player1TokenD.color = 'pink';
  player1TokenD.strokeWeight = 2;
  player1TokenD.text = 4;
  player1TokenD.textSize = 20; 
  player1TokenD.collider = 's';
  player1TokenD.pos = { x: 4 * blockWidth + blockWidth / 2, y: 4 * blockHeight + blockHeight / 2 };
}

function constructPlayer2TokensExt(){
  let player2TokenB = new Sprite();
  player2TokenB.layer = 5;
	player2TokenB.diameter = 40;
  player2TokenB.color = 'yellow';
  player2TokenB.strokeWeight = 2;
  player2TokenB.text = 2;
  player2TokenB.textSize = 20; 
  player2TokenB.collider = 's';
  player2TokenB.pos = { x: 10 * blockWidth + blockWidth / 2, y: 2 * blockHeight + blockHeight / 2 };

  let player2TokenC = new Sprite();
  player2TokenC.layer = 5;
	player2TokenC.diameter = 40;
  player2TokenC.color = 'yellow';
  player2TokenC.strokeWeight = 2;
  player2TokenC.text = 3;
  player2TokenC.textSize = 20; 
  player2TokenC.collider = 's';
  player2TokenC.pos = { x: 13 * blockWidth + blockWidth / 2, y: 2 * blockHeight + blockHeight / 2 };

  let player2TokenD = new Sprite();
  player2TokenD.layer = 5;
	player2TokenD.diameter = 40;
  player2TokenD.color = 'yellow';
  player2TokenD.strokeWeight = 2;
  player2TokenD.text = 4;
  player2TokenD.textSize = 20; 
  player2TokenD.collider = 's';
  player2TokenD.pos = { x: 13 * blockWidth + blockWidth / 2, y: 4 * blockHeight + blockHeight / 2 };
}

function constructPlayer3TokensExt(){
  let player3TokenB = new Sprite();
  player3TokenB.layer = 5;
	player3TokenB.diameter = 40;
  player3TokenB.color = 'green';
  player3TokenB.strokeWeight = 2;
  player3TokenB.text = 2;
  player3TokenB.textSize = 20; 
  player3TokenB.collider = 's';
  player3TokenB.pos = { x: 10 * blockWidth + blockWidth / 2, y: 11 * blockHeight + blockHeight / 2 };

  let player3TokenC = new Sprite();
  player3TokenC.layer = 5;
	player3TokenC.diameter = 40;
  player3TokenC.color = 'green';
  player3TokenC.strokeWeight = 2;
  player3TokenC.text = 3;
  player3TokenC.textSize = 20; 
  player3TokenC.collider = 's';
  player3TokenC.pos = { x: 13 * blockWidth + blockWidth / 2, y: 11 * blockHeight + blockHeight / 2 };

  let player3TokenD = new Sprite();
  player3TokenD.layer = 5;
	player3TokenD.diameter = 40;
  player3TokenD.color = 'green';
  player3TokenD.strokeWeight = 2;
  player3TokenD.text = 4;
  player3TokenD.textSize = 20; 
  player3TokenD.collider = 's';
  player3TokenD.pos = { x: 13 * blockWidth + blockWidth / 2, y: 13 * blockHeight + blockHeight / 2 };
}

function constructPlayer4TokensExt(){
  let player4TokenB = new Sprite();
  player4TokenB.layer = 5;
	player4TokenB.diameter = 40;
  player4TokenB.color = 'turquoise';
  player4TokenB.strokeWeight = 2;
  player4TokenB.text = 2;
  player4TokenB.textSize = 20; 
  player4TokenB.collider = 's';
  player4TokenB.pos = { x: 1 * blockWidth + blockWidth / 2, y: 11 * blockHeight + blockHeight / 2 };

  let player4TokenC = new Sprite();
  player4TokenC.layer = 5;
	player4TokenC.diameter = 40;
  player4TokenC.color = 'turquoise';
  player4TokenC.strokeWeight = 2;
  player4TokenC.text = 3;
  player4TokenC.textSize = 20; 
  player4TokenC.collider = 's';
  player4TokenC.pos = { x: 4 * blockWidth + blockWidth / 2, y: 11 * blockHeight + blockHeight / 2 };

  let player4TokenD = new Sprite();
  player4TokenD.layer = 5;
	player4TokenD.diameter = 40;
  player4TokenD.color = 'turquoise';
  player4TokenD.strokeWeight = 2;
  player4TokenD.text = 4;
  player4TokenD.textSize = 20; 
  player4TokenD.collider = 's';
  player4TokenD.pos = { x: 4 * blockWidth + blockWidth / 2, y: 13 * blockHeight + blockHeight / 2 };
}

function constructPlayer1Path() {
  player1Path.push({ x : 1, y : 6 });
  player1Path.push({ x : 2, y : 6});
  player1Path.push({ x : 3, y : 6 });
  player1Path.push({ x : 4, y : 6 });
  player1Path.push({ x : 5, y : 6 });

  player1Path.push({ x : 6, y : 5 });
  player1Path.push({ x : 6, y : 4 });
  player1Path.push({ x : 6, y : 3 });
  player1Path.push({ x : 6, y : 2 });
  player1Path.push({ x : 6, y : 1 });
  player1Path.push({ x : 6, y : 0 });

  player1Path.push({ x : 7, y : 0 });
  player1Path.push({ x : 8, y : 0 });
  player1Path.push({ x : 8, y : 1 });
  player1Path.push({ x : 8, y : 2 });
  player1Path.push({ x : 8, y : 3 });
  player1Path.push({ x : 8, y : 4 });
  player1Path.push({ x : 8, y : 5 });

  player1Path.push({ x : 9, y : 6 });
  player1Path.push({ x : 10, y : 6 });
  player1Path.push({ x : 11, y : 6 });
  player1Path.push({ x : 12, y : 6 });
  player1Path.push({ x : 13, y : 6 });      
  player1Path.push({ x : 14, y : 6 });
  
  player1Path.push({ x : 14, y : 7 });
  player1Path.push({ x : 14, y : 8 });
  player1Path.push({ x : 13, y : 8 });
  player1Path.push({ x : 12, y : 8 });
  player1Path.push({ x : 11, y : 8 });
  player1Path.push({ x : 10, y : 8 });
  player1Path.push({ x : 9, y : 8 });

  player1Path.push({ x : 8, y : 9 });
  player1Path.push({ x : 8, y : 10 });
  player1Path.push({ x : 8, y : 11 });
  player1Path.push({ x : 8, y : 12 });
  player1Path.push({ x : 8, y : 13 });

  player1Path.push({ x : 8, y : 14 });
  player1Path.push({ x : 7, y : 14 });
  player1Path.push({ x : 6, y : 14 });

  player1Path.push({ x : 6, y : 13 });
  player1Path.push({ x : 6, y : 12 });
  player1Path.push({ x : 6, y : 11 });
  player1Path.push({ x : 6, y : 10 });
  player1Path.push({ x : 6, y : 9 });

  player1Path.push({ x : 5, y : 8 });
  player1Path.push({ x : 4, y : 8 });
  player1Path.push({ x : 3, y : 8 });
  player1Path.push({ x : 2, y : 8 });
  player1Path.push({ x : 1, y : 8 });

  player1Path.push({ x : 0, y : 8 });
  player1Path.push({ x : 0, y : 7 });

  // Home run
  player1Path.push({ x : 1, y : 7 });
  player1Path.push({ x : 2, y : 7 });
  player1Path.push({ x : 3, y : 7 });
  player1Path.push({ x : 4, y : 7 });
  player1Path.push({ x : 5, y : 7 });
  player1Path.push({ x : 6, y : 7 });
}

function constructplayer2Path() {
  player2Path.push({ x : 8, y : 1 });
  player2Path.push({ x : 8, y : 2 });
  player2Path.push({ x : 8, y : 3 });
  player2Path.push({ x : 8, y : 4 });
  player2Path.push({ x : 8, y : 5 });

  player2Path.push({ x : 9, y : 6 });
  player2Path.push({ x : 10, y : 6 });
  player2Path.push({ x : 11, y : 6 });
  player2Path.push({ x : 12, y : 6 });
  player2Path.push({ x : 13, y : 6 });      
  player2Path.push({ x : 14, y : 6 });
  
  player2Path.push({ x : 14, y : 7 });
  
  player2Path.push({ x : 14, y : 8 });
  player2Path.push({ x : 13, y : 8 });
  player2Path.push({ x : 12, y : 8 });
  player2Path.push({ x : 11, y : 8 });
  player2Path.push({ x : 10, y : 8 });
  player2Path.push({ x : 9, y : 8 });

  player2Path.push({ x : 8, y : 9 });
  player2Path.push({ x : 8, y : 10 });
  player2Path.push({ x : 8, y : 11 });
  player2Path.push({ x : 8, y : 12 });
  player2Path.push({ x : 8, y : 13 });
  player2Path.push({ x : 8, y : 14 });
  
  player2Path.push({ x : 7, y : 14 });
  
  player2Path.push({ x : 6, y : 14 });
  player2Path.push({ x : 6, y : 13 });
  player2Path.push({ x : 6, y : 12 });
  player2Path.push({ x : 6, y : 11 });
  player2Path.push({ x : 6, y : 10 });
  player2Path.push({ x : 6, y : 9 });

  player2Path.push({ x : 5, y : 8 });
  player2Path.push({ x : 4, y : 8 });
  player2Path.push({ x : 3, y : 8 });
  player2Path.push({ x : 2, y : 8 });
  player2Path.push({ x : 1, y : 8 });
  player2Path.push({ x : 0, y : 8 });
  
  player2Path.push({ x : 0, y : 7 });

  player2Path.push({ x : 0, y : 6 });
  player2Path.push({ x : 1, y : 6 });
  player2Path.push({ x : 2, y : 6 });
  player2Path.push({ x : 3, y : 6 });
  player2Path.push({ x : 4, y : 6 });
  player2Path.push({ x : 5, y : 6 });

  player2Path.push({ x : 6, y : 5 });
  player2Path.push({ x : 6, y : 4 });
  player2Path.push({ x : 6, y : 3 });
  player2Path.push({ x : 6, y : 2 });
  player2Path.push({ x : 6, y : 1 });
  player2Path.push({ x : 6, y : 0 });

  player2Path.push({ x : 7, y : 0 });
  
  // Home run
  player2Path.push({ x : 7, y : 1 });
  player2Path.push({ x : 7, y : 2 });
  player2Path.push({ x : 7, y : 3 });
  player2Path.push({ x : 7, y : 4 });
  player2Path.push({ x : 7, y : 5 });
  player2Path.push({ x : 7, y : 6 });
}

function constructplayer3Path() {
  player3Path.push({ x : 13, y : 8 });
  player3Path.push({ x : 12, y : 8 });
  player3Path.push({ x : 11, y : 8 });
  player3Path.push({ x : 10, y : 8 });
  player3Path.push({ x : 9, y : 8 });

  player3Path.push({ x : 8, y : 9 });
  player3Path.push({ x : 8, y : 10 });
  player3Path.push({ x : 8, y : 11 });
  player3Path.push({ x : 8, y : 12 });
  player3Path.push({ x : 8, y : 13 });
  player3Path.push({ x : 8, y : 14 });

  player3Path.push({ x : 7, y : 14 });
  
  player3Path.push({ x : 6, y : 14 });
  player3Path.push({ x : 6, y : 13 });
  player3Path.push({ x : 6, y : 12 });
  player3Path.push({ x : 6, y : 11 });
  player3Path.push({ x : 6, y : 10 });
  player3Path.push({ x : 6, y : 9 });

  player3Path.push({ x : 5, y : 8 });
  player3Path.push({ x : 4, y : 8 });
  player3Path.push({ x : 3, y : 8 });
  player3Path.push({ x : 2, y : 8 });
  player3Path.push({ x : 1, y : 8 });
  player3Path.push({ x : 0, y : 8 });
  
  player3Path.push({ x : 0, y : 7 });

  player3Path.push({ x : 0, y : 6 });
  player3Path.push({ x : 1, y : 6 });
  player3Path.push({ x : 2, y : 6 });
  player3Path.push({ x : 3, y : 6 });
  player3Path.push({ x : 4, y : 6 });
  player3Path.push({ x : 5, y : 6 });

  player3Path.push({ x : 6, y : 5 });
  player3Path.push({ x : 6, y : 4 });
  player3Path.push({ x : 6, y : 3 });
  player3Path.push({ x : 6, y : 2 });
  player3Path.push({ x : 6, y : 1 });
  player3Path.push({ x : 6, y : 0 });

  player3Path.push({ x : 7, y : 0 });
  
  player3Path.push({ x : 8, y : 0 });
  player3Path.push({ x : 8, y : 1 });
  player3Path.push({ x : 8, y : 2 });
  player3Path.push({ x : 8, y : 3 });
  player3Path.push({ x : 8, y : 4 });
  player3Path.push({ x : 8, y : 5 });

  player3Path.push({ x : 9, y : 6 });
  player3Path.push({ x : 10, y : 6 });
  player3Path.push({ x : 11, y : 6 });
  player3Path.push({ x : 12, y : 6 });
  player3Path.push({ x : 13, y : 6 });      
  player3Path.push({ x : 14, y : 6 });
  
  player3Path.push({ x : 14, y : 7 });
  

  // Home run
  player3Path.push({ x : 13, y : 7 });
  player3Path.push({ x : 12, y : 7 });
  player3Path.push({ x : 11, y : 7 });
  player3Path.push({ x : 10, y : 7 });
  player3Path.push({ x : 9, y : 7 });
  player3Path.push({ x : 8, y : 7 });
}

function constructplayer4Path() {
  player4Path.push({ x : 6 , y : 13 });
  player4Path.push({ x : 6, y : 12 });
  player4Path.push({ x : 6, y : 11 });
  player4Path.push({ x : 6, y : 10 });
  player4Path.push({ x : 6, y : 9 });

  player4Path.push({ x : 5, y : 8 });
  player4Path.push({ x : 4, y : 8 });
  player4Path.push({ x : 3, y : 8 });
  player4Path.push({ x : 2, y : 8 });
  player4Path.push({ x : 1, y : 8 });
  player4Path.push({ x : 0, y : 8 });
  
  player4Path.push({ x : 0, y : 7 });

  player4Path.push({ x : 0, y : 6 });
  player4Path.push({ x : 1, y : 6 });
  player4Path.push({ x : 2, y : 6 });
  player4Path.push({ x : 3, y : 6 });
  player4Path.push({ x : 4, y : 6 });
  player4Path.push({ x : 5, y : 6 });

  player4Path.push({ x : 6, y : 5 });
  player4Path.push({ x : 6, y : 4 });
  player4Path.push({ x : 6, y : 3 });
  player4Path.push({ x : 6, y : 2 });
  player4Path.push({ x : 6, y : 1 });
  player4Path.push({ x : 6, y : 0 });

  player4Path.push({ x : 7, y : 0 });
  
  player4Path.push({ x : 8, y : 0 });
  player4Path.push({ x : 8, y : 1 });
  player4Path.push({ x : 8, y : 2 });
  player4Path.push({ x : 8, y : 3 });
  player4Path.push({ x : 8, y : 4 });
  player4Path.push({ x : 8, y : 5 });

  player4Path.push({ x : 9, y : 6 });
  player4Path.push({ x : 10, y : 6 });
  player4Path.push({ x : 11, y : 6 });
  player4Path.push({ x : 12, y : 6 });
  player4Path.push({ x : 13, y : 6 });      
  player4Path.push({ x : 14, y : 6 });
  
  player4Path.push({ x : 14, y : 7 });

  player4Path.push({ x : 14, y : 8 });
  player4Path.push({ x : 13, y : 8 });
  player4Path.push({ x : 12, y : 8 });
  player4Path.push({ x : 11, y : 8 });
  player4Path.push({ x : 10, y : 8 });
  player4Path.push({ x : 9, y : 8 });

  player4Path.push({ x : 8, y : 9 });
  player4Path.push({ x : 8, y : 10 });
  player4Path.push({ x : 8, y : 11 });
  player4Path.push({ x : 8, y : 12 });
  player4Path.push({ x : 8, y : 13 });
  player4Path.push({ x : 8, y : 14 });

  player4Path.push({ x : 7, y : 14 });

  
  // Home run
  player4Path.push({ x : 7, y : 13 });
  player4Path.push({ x : 7, y : 12 });
  player4Path.push({ x : 7, y : 11 });
  player4Path.push({ x : 7, y : 10 });
  player4Path.push({ x : 7, y : 9 });
  player4Path.push({ x : 7, y : 8 });
}