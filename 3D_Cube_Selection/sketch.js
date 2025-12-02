let c = [];
let cubesarray = [];
let focusbox = 0;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    for (var i = 0; i < 1000; i++){
        b = new cubes()
        cubesarray.push(b)
    }
}

function draw() {

    orbitControl()
    background(0);


    for (var i = 0; i < 1000; i++){
        cubesarray[i].show()
    }

    c = get(mouseX,mouseY)

    //console.log(c)

    for (var j = 0; j < 1000; j++){
        if ((cubesarray[j].R == c[0]) &&
            (cubesarray[j].G == c[1]) &&
            (cubesarray[j].B == c[2]))  {

            console.log(j)
            push()
            focusbox = j
            translate(cubesarray[j].x,cubesarray[j].y,cubesarray[j].z)
            box(20)
            pop()
        }
    }
}

class cubes{
    constructor(){
        this.x = random(-100, 100)
        this.y = random(-100, 100)
        this.z = random(-100, 100)

        this.R = int(random(0,255));
        this.G = int(random(0,255));
        this.B = int(random(0,255));
    }
    show(){
        push()
        noStroke();
        translate(this.x, this.y, this.z)
        fill(this.R, this.G, this.B)
        box(10)

        pop()
    }
}
