var x1 = 0;
var x2 = 0;
var y1 = 0;
var y2 = 0;
var x3 = 0;
var x4 = 0;
var y3 = 0;
var y4 = 0;

let lines = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    background(0);
    noFill();
    stroke(255);
    t = 0;

    for(var i = 0; i < 10; i ++){
        b = new bezline();
        lines.push(b);
    }
}

function draw() {
    background(0,0,0,1);

    for(var i = 0; i < 10; i ++){
        lines[i].show();
    }

    t += 0.03;
}

class bezline{
    constructor(){
        this.x1 = 0;
        this.x2 = 0;
        this.y1 = 0;
        this.y2 = 0;
        this.x3 = 0;
        this.x4 = 0;
        this.y3 = 0;
        this.y4 = 0;

        this.t = random(0,400);

        this.r = random(0,255);
        this.g = random(0,255);
        this.b = random(0,255);




    }

    show(){
        stroke(this.r,this.g,this.b);

        bezier (this.x1, this.y1,
            this.x3 ,this.y3,
            this.x4, this.y4,
            this.x2, this.y2);

        this.x1 = width *  noise(this.t + 1);
        this.x2 = width *  noise(this.t + 2);
        this.y1 = height * noise(this.t + 3);
        this.y2 = height * noise(this.t + 4);
        this.x3 = width *  noise(this.t + 5);
        this.x4 = width *  noise(this.t + 6);
        this.y3 = height * noise(this.t + 7);
        this.y4 = height * noise(this.t + 8);

        this.t += 0.001;


    }

}