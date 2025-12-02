let clickmain;
let env;

let clock = 0;

let prevposx = 0
let prevposy = 0
let posx = 0
let posy = 0

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL)
    clickmain = new p5.Noise('white');

    clickmain.start()

    env = new p5.Envelope();
    env.setADSR(0, 0.02, 0.0, 0);

    env.setRange(0.8, 0);
}

function draw() {
    fill(0,0,0,10)

    rectMode(CENTER)
    rect(0,0, windowWidth, windowHeight)
    clickmain.amp(env)

    clock = frameCount;
    if (clock % 5 == 0){

        if(random(0, 10) > 5){
            toggle();
            for(var i = 0; i < 10; i ++){
                fill(255)

                stroke(255)
                strokeWeight(1)

                prevposx = posx;
                prevposy = posy;

                posx = random(-200, 200);
                posy = random(-200, 200);

                line(prevposx, prevposy, posx, posy)
            }
        }

    }

    if (clock % 10 == 0){
        if(random(0, 10) > 3){
            redsquare();
        }
    }

    if (clock % 10 == 0){
        if(random(0, 10) > 3){
            GridOverlay()
        }
    }
}

function redsquare(){
    fill(255,0,0, 100)
    rectMode(CENTER)
    rect(random(-400, 400), random(-400, 400), random(0, 100), random(0, 100))
}

function GridOverlay(){
    for (var i = (windowWidth/2*-1); i < windowWidth; i += (windowWidth/100)){

        noStroke()
        fill(255,255,255,30)

        rect(i, windowHeight/2*-1, 1, windowHeight*2);
    }
}

function toggle(){
    env.play()
}