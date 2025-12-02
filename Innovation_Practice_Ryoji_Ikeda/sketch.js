let posx = 0;
let prevposx = 0;
let prevposy = 0;

let linestart = 0;


let lines = [];
let index = 0;

let count = 0;
let rectsize = 0;

let t = 0;

const PING_INTERVAL = 2000; // ms between pings



let words = ["print", "printf", "println", "cout", "cin", "System.out", "main", "class", "public", "private", "protected", "static", "void", "int", "float", "double", "char", "boolean", "String", "new", "delete", "malloc", "free", "return", "if", "else", "for", "while", "do", "switch", "case", "break", "continue", "try", "catch", "throw", "throws", "import", "include", "namespace", "this", "super", "extends", "implements", "virtual", "override", "const", "constexpr", "struct", "enum", "template", "typedef"];



function setup() {
    createCanvas(windowWidth, windowHeight);
    funkylinesgraph = createGraphics(windowWidth, windowHeight)
    grid = createGraphics(windowWidth,windowHeight, WEBGL)
    linetotextgraph = createGraphics(windowWidth, windowHeight);
    perlincanvas = createGraphics(windowWidth, windowHeight);
    perlincanvas.strokeWeight(0.1)
    perlincanvas.stroke(255)




    for (var i = 0; i < 1000; i++){
        b = new PNoise();
        lines.push(b);
    }
}

function draw() {

    background(0,0,0)


    for (var i = 0; i < 1000; i++){
        lines[i].show();
    }

    perlincanvas.background(0,0,0,10)

    grid.noFill()
    grid.strokeWeight(0.1)
    grid.stroke(255,255,255)
    grid.rotateX(sin(frameCount*0.01) * 0.01);
    grid.rotateZ(cos(frameCount*0.01) * 0.02);
    grid.box(rectsize,300, 100)


    image(perlincanvas,0,0);
    image(grid, 0, 0)
    image(linetotextgraph,0,0)


    count ++;
    if(count > 5){
        count = 0;
        randomtext();
        linetotext()

        rectsize = random(0,100)
        grid.clear();
    }

    funkylines()





}

class PNoise{
    constructor(){
        this.rspeedx = random(0, 1) * 0.01
        this.rspeedy = random(0, 1) * 0.01
    }
    show(){
        this.posx = noise(frameCount*
            this.rspeedx)
        this.posy = noise(frameCount*
            this.rspeedy)
        this.posx = map(this.posx,0,1,0,windowWidth)
        this.posy = map(this.posy,0,1,0,windowHeight)

        if (this.prevposx != 0){

            perlincanvas.circle(this.posx, this.posy, 0.1)
        }
        else{
        }

        this.prevposx = this.posx
        this.prevposy = this.posy

    }
}

function randomtext(){
    index = (int(random(0, lines.length)))

    let word = random(words);
    perlincanvas.stroke(255)
    perlincanvas.fill(255,255,255,(random(0, 255)) )
    perlincanvas.textSize(15)
    perlincanvas.text(word, lines[index].posx, lines[index].posy)

}

function linetotext(){
    linetotextgraph.clear()

    linetotextgraph.noFill()
    linetotextgraph.strokeWeight(1)
    linetotextgraph.stroke(255)
    linestart ++;
    if (linestart > windowWidth){
        linestart = 0;
    }
    else{

    }

    linetotextgraph.line(10, linestart,
        lines[index].posx,
        lines[index].posy)

    linetotextgraph.stroke(255,0,0,255)
    linetotextgraph.strokeWeight(0.3)
    linetotextgraph.line(0,lines[index].posy, windowWidth,lines[index].posy)
    linetotextgraph.line(lines[index].posx,0, lines[index].posx, windowHeight)

}

function funkylines(){
    funkylinesgraph.background(0,0,0,10)
    var x1 = (windowWidth*0.1) * noise(t + 1) + (windowWidth * 0.9);
    var x2 = (windowWidth*0.1) * noise(t + 2) + (windowWidth * 0.9);
    var y1 = height * noise(t + 3);
    var y2 = height * noise(t + 4);

    perlincanvas.stroke(255)
    perlincanvas.line(x1, y1, x2, y2);
    perlincanvas.line(windowWidth,0,x1,y1)
    perlincanvas.line(windowWidth,windowHeight,x2,y2)
    t += 0.01;
}






