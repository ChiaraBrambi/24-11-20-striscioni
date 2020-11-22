let baloonIcon, baloonBIcon, tutIconB, logor,freccia; //icone
let xBarra = 20; //lunghezza barra %
let w, h; //posizione
let s=0;//ellisse BONUS
let palette = ['#F9F9F9', '#D5D0D3', '#B7AEB5', '#877B85'];

//variabile suono trombetta
let alt = 1; //h dei rettangoli suono
let i = 0; //regola ogni quanto cambia alt
let p_coord = 0; //var coordinazione

let n_trombetta = 0; //var piattaforma: quando alt!=1 viene incrementata
let n_interazione = 0; //var utente usa la trobetta, preme bottone
//se faccio ntrombetta/niterazione trovo la coordinazione

let b1,b2;
/////////////////////////////////////////////////////////////////////////

function preload() {
  baloonIcon = loadImage("./assets/baloon.png"); //nuvoletta scura
  baloonBIcon = loadImage("./assets/baloonB.png"); //nuvoletta chiara
  tutIconB = loadImage("./assets/Tutorial_Esclamazioni.gif")//tutorial
  logor = loadImage("./assets/logopiccolo.png")//logo ridotto
  freccia = loadImage("./assets/freccia.png");
}

/////////////////////////////////////////////////////////////////////////
function setup() {
  createCanvas(windowWidth, windowHeight);
  frameRate(20); //rallenta

  //BOTTONI

    b1 = createButton('FORZA');
    b1.position((width/2-330),height/2-30);
    b2 = createButton('BRAVI')
    b2.position((width/2+100),height/2-30);
}

/////////////////////////////////////////////////////////////////////////
function draw() {
  background('#F9F9F9'); //chiaro
  imageMode(CENTER); //per pittogrammi
  noStroke();

  w = width/2;
  h = height/8;

  //testo caratteristiche
  textFont('quicksand');
  textAlign(CENTER, TOP);
  textStyle(BOLD);

  //testo centrale
  textSize(16);
  fill('#877B85'); //4° colore PALETTE
  text('PARTITA COOD O1', w, height / 11);
  fill('#B7AEB5'); //3° PALETTE
  text('SQUADRA1-SQUADRA2', w, h);

  //logo a destra
  image(logor, width/11*9.8, height /9,logor.width/4.5,logor.height/4.5);
  //freccia
  image(freccia, width/11, height /9,freccia.width/6,freccia.height/6);

  //testo sotto
  textSize(14);
  text('COORDINAZIONE', w-30, h*6.5);
  text('BONUS', width/11+15, h*6.5);

  //BARRA
  fill('#D5D0D3'); //barre grige
  rectMode(CENTER);
  rect(w, h*7 ,width / 3.5, 15, 20); //rect(x,y,w,h,[tl])
  xBarra = ((width / 3.5) / 100) * p_coord; //altezza barra %, xTot= 439 = width / 3.5
  push();
  rectMode(CORNER);
  fill('#877B85');//barre viola
  //width/7 è la metà della barra, che è lunga width/3.5
  rect(w-width/7, h*7-7.5, xBarra ,15, 20);
  pop();

//pallini BONUS
  for(let i=0; i<6;i++){
    ellipse(width/11 + s , h*7 , 15);
    s =25*i;
    }
/////////////////// LA PARTE SOPRA è STANDARD ///////////////////////////////////////////////


//BARRE DEL SUONO TROMBETTA
  if (frameCount % 50 == 0) { //multiplo di 50 incrementa i
    i++
  }
  //barrette lato sinistro
  for (var x = width / 6 * 1.5; x < width / 2.2; x += 40) {
    if (i % 2 != 0) { //quando i è dispari altezza deve diventare 1*random
      alt = 1 * random(2, 10);
      n_trombetta++;
    } else {
      alt = 1;
      n_trombetta = 0.1;
    }
    //liniette suono della trombetta
    // noStroke();
    // fill(135, 123, 133);
    // rectMode(CENTER);
    // rect(x, height / 2, 15, 15 * alt, 20);
    // rect(x + width / 3.15, height / 2, 15, 15 * alt, 20);
  }

  //PERCENTUALE
    text(p_coord + '%',w+(width/28), h*6.5 ); //w, height / 5 * 4.5

  //PER LA BARRA DELLA PERCENTUALE
  //interazione utente, temporaneamente tasto ENTER
  if (alt != 1 & keyIsDown(ENTER)) {
    n_interazione += 4; // per far tornare la percentuale in pai alla trombetta
    p_coord = round((n_interazione / n_trombetta) * 100) * 2;
  } else if (alt = 1) {
    n_interazione = 0;
    p_coord = 0;
  }

  textSize(16);
  fill('#B7AEB5'); //3 PALETTE
//TUTORIAL TROMBETTA
if(i<3 ||i==3){
image(tutIconB, width / 2, height / 2, tutIconB.width / 4, tutIconB.height / 4);
text('TUTORIAL', width / 2, height / 6*3.5);
}

//ICONE NORMALI
if (keyIsDown(ENTER) && i>3) {
    push();
    fill('#877B85');
    noStroke();
    strokeWeight(5);
    ellipse(width / 2, height / 2, 100); //cerchio centrale
    image(baloonBIcon, width / 2, height / 2, baloonBIcon.width / 6, baloonBIcon.height / 6);
    pop();
  }else if (keyIsDown(ENTER)==false && i>3 ){ // cambio colore dle bottone centrale: feedback utente
  push();
  noFill();
  stroke('#877B85');
  strokeWeight(5);
  ellipse(width / 2, height / 2, 100); //cerchio centrale
  image(baloonIcon, width / 2, height / 2, baloonIcon.width / 6, baloonIcon.height / 6); // trombetta scura
  pop();}
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
