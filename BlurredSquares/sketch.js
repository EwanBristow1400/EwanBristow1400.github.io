let xpos = 0;

let cubearray = []

function setup() {
    createCanvas(windowWidth, windowHeight);

    blur = createGraphics(windowWidth,windowHeight);

    for (var i = 0; i < 100; i ++){
        b = new cubes();
        cubearray.push(b);
    }

}

function draw() {
    blur.background(0);
    blur.noStroke();


    for (var i = 0; i < 100; i ++){

        cubearray[i].show();
    }

    image(blur,0,0);

    drawingContext.filter = 'blur(10px)';

    filter(POSTERIZE, 1)


}

class cubes{
    constructor(){
        this.xpos = random(0, windowWidth);
        this.ypos = random(0, windowHeight);

        this.xvel = random(-3, 3);
        this.yvel = random(-3, 3)
    }

    show(){

        if(this.xpos < -102) this.xpos = windowWidth + 100
        if(this.xpos > windowWidth + 100) this.xpos = -100

        this.xpos += this.xvel;
        this.ypos += this.yvel;


        blur.rect(this.xpos,this.ypos, 100, 100, 30);
    }
}