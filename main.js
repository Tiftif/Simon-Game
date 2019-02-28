let order = [];
let playOrder = [];
let flash;
let turn;
let good;
let comptTurn;
let intervalId;
let strict = false;
let noise = true;
let on = false;
let win;

const turnCounter = document.querySelector("#turn");
const topleft = document.querySelector("#topleft");
const topright = document.querySelector("#topright");
const bottomleft = document.querySelector("#bottomleft");
const bottomright = document.querySelector("#bottomright");
const strictButton = document.querySelector("#strict");
const onButton = document.querySelector("#on");
const startButton = document.querySelector("#start");

// commencer dans le sens du jeu
// si le hard est activé
strictButton.addEventListener('click', (event) => { // fonction fléché(arrow)
  if (strictButton.checked == true) {
    strict = true;
  } else {
    strict = false;
  }
});

// si le on est activé
onButton.addEventListener('click', (event) => {
  if (onButton.checked == true) {
    on = true;
    turnCounter.innerHTML = "-";
  } else {
    on = false;
    turnCounter.innerHTML = "";
    clearColor();
    clearInterval(intervalId);
  }
});

startButton.addEventListener('click', (event) => {
  if (on || win) { //short code pour dire si on et win = true
    play(); // appel play function
  }
});

function play() { // reset les variables
  win = false;
  order = [];
  playOrder = [];
  flash = 0;
  intervalId = 0;
  turn = 1;
  turnCounter.innerHTML = 1;
  good = true; // player n'a pas encore fait de faute
  //booble pour l'order random les lumieres
  for (var i = 0; i < 20; i++) { // 20round avant de gagner
    order.push(Math.floor(Math.random() * 4) + 1); // random chiffre entre 1 et 4
  }
  comptTurn = true;
  intervalId = setInterval(gameTurn, 800); // tous les 800mls
}

function gameTurn() {
  on = false; // tant que le la machine allume les lumieres le joueur n'a pas la main
  if (flash == turn) {
    clearInterval(intervalId);
    comptTurn = false; // si le tour est joué
    clearColor(); // enleve les couleur
    on = true; // au tour du joueur
  }
  if (comptTurn) {
    clearColor();
    setTimeout(() => {
      if (order[flash] == 1) one(); // si le nombre est 1 on flash une couleur etc...
      if (order[flash] == 2) two();
      if (order[flash] == 3) tree();
      if (order[flash] == 4) four();
      flash++; // incrementation de flash
    }, 200); // stop flash tous les 200mls
  }
}

// les fnc couleurs

function one() {
  if (noise) {
    let audio = document.getElementById("clip1");
    audio.play()
  }
  noise = true;
  topleft.style.backgroundColor = "lightgreen";
};

function two() {
  if (noise) {
    let audio = document.getElementById("clip2");
    audio.play()
  }
  noise = true;
  topright.style.backgroundColor = "tomato";
}

function tree() {
  if (noise) {
    let audio = document.getElementById("clip3");
    audio.play()
  }
  noise = true;
  bottomleft.style.backgroundColor = "yellow";
};

function four() {
  if (noise) {
    let audio = document.getElementById("clip4");
    audio.play()
  }
  noise = true;
  bottomright.style.backgroundColor = "lightskyblue";
};



// le jeu commence avec couleur dark
function clearColor() {
  topleft.style.backgroundColor = "darkgreen";
  topright.style.backgroundColor = "darkred";
  bottomleft.style.backgroundColor = "goldenrod";
  bottomright.style.backgroundColor = "darkblue";
};


// les couleurs s'affiche si le joueur reponds correctement
function flashColor() {
  topleft.style.backgroundColor = "lightgreen";
  topright.style.backgroundColor = "tomato";
  bottomleft.style.backgroundColor = "yellow";
  bottomright.style.backgroundColor = "lightskyblue";
};


// le joueur peut cliquer


topleft.addEventListener('click', (event) => {
  if (on) {
    playOrder.push(1); // si le joueur press 1
    check();
    one();
    if (!win) // si le joueur n'a pas encore gagné
      setTimeout(() => {
        clearColor();
      }, 300);
  }
});


topright.addEventListener('click', (event) => {
  if (on) {
    playOrder.push(2); // si le joueur press 2
    check();
    two();
    if (!win) // si le joueur n'a pas encore gagné
      setTimeout(() => {
        clearColor();
      }, 300);
  }
});

bottomleft.addEventListener('click', (event) => {
  if (on) {
    playOrder.push(3); // si le joueur press 3
    check();
    tree();
    if (!win) // si le joueur n'a pas encore gagné
      setTimeout(() => {
        clearColor();
      }, 300);
  }
});

bottomright.addEventListener('click', (event) => {
  if (on) {
    playOrder.push(4); // si le joueur press 4
    check();
    four();
    if (!win) // si le joueur n'a pas encore gagné
      setTimeout(() => {
        clearColor();
      }, 300);
  }
});


function check() {
  if (playOrder[playOrder.length -1] !== order[playOrder.length - 1]) // si ce n'est pas la meme chose
    good = false; // le joueur a faux

    if(playOrder.length == 15 && good == true) { // si il fait 20 qu'il n'a pas fait faux, il gagne
    winGame();
  }
  if (good == false) { // si il perd
    flashColor();
    turnCounter.innerHTML = "NON!"
    setTimeout(() => {
      turnCounter.innerHTML = turn;
      clearColor();
      if (strict) { // si le hard est activé
        play(); // on lance la boucle pour reset le jeu
      }else { // sinon on reset
        comptTurn = true;
        flash = 0;
        playOrder = [];
        good = true;
        intervalId = setInterval(gameTurn, 800);
      }
    }, 800);

    noise = false; // si le joueur a faux on ne joue pas la note
  }
  if (turn == playOrder.length && good && !win) {
    turn++;
    playOrder = [];
    comptTurn = true;
    flash = 0;
    turnCounter.innerHTML = turn;
    intervalId = setInterval(gameTurn, 800);
  }// si c'est correct pas encore gagner
}

// si il gagne
function winGame() {
  flashColor();
  turnCounter.innerHTML = "WIN";
  on = false;
  win = true;
};
