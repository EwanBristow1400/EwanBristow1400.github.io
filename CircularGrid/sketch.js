let pos;
let step;
let stepsize = 12;
let stepamount = 1;
let state = 0;

let turncounter = 0

function setup() {

    createCanvas(windowWidth, windowHeight);
    pos = createVector(0,0);
    pos.x = windowWidth /2;
    pos.y = windowHeight/2
    step = 1
    background(0)
}

function draw() {
    textSize(10)
    rectMode(CENTER)
    stroke(255)

    switch (state){
        case 0: pos.x += stepsize; break;
        case 1: pos.y -= stepsize; break;
        case 2: pos.x -= stepsize; break;
        case 3: pos.y += stepsize; break;
    }

    if (step % stepamount == 0){
        state = (state + 1 ) % 4
        turncounter ++
        if (turncounter %2 == 0){
            stepamount += 2
        }
    }

    if (turncounter % 4.5 == 0) {fill(255,0,0)}
    else {fill(255)}

    strokeWeight(0.1)
    rect(pos.x,pos.y,10)
    step++
}