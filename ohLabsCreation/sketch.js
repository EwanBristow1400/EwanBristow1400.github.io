let Timer = 0;
let BlockArray = []
let blockColour = []


function setup() {
    createCanvas(windowWidth, windowHeight)
    grid = createGraphics(windowWidth, windowHeight)
    createInitGrid()
}

function draw() {
    background(0);
    stroke(10)
    fill(0)

    image(grid,0,0)


    Timer ++
    if (Timer > random(20, 100)){
        Timer = 0;
        BlockArray = []
        blockColour = [random(0, 255),random(0, 255),random(0, 255)]
        for (i = 0; i < 40; i++){
            r = new randomBlock(blockColour)
            BlockArray.push(r)
        }
    }

    for (i = 0; i < BlockArray.length; i++){
        BlockArray[i].show()
    }

    push()
    blendMode(DIFFERENCE)
    fill(255)
    textSize(windowHeight*0.2)
    textAlign(LEFT,TOP)
    text("I\nMake\nAudio\nTools" ,20 , 20)
    pop()

}

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
    grid.resizeCanvas(windowWidth, windowHeight)
    createInitGrid()
}

class randomBlock{

    constructor(BlockColour){
        this.x = round(random(0, windowWidth) / 30) * 30
        this.y = round(random(0, windowHeight) / 30) * 30
        this.col = BlockColour
    }

    show(){
        fill(this.col)
        rect(this.x, this.y, 30)
    }
}


function createInitGrid(){
    grid.fill(30)
    grid.stroke(100)
    for (i = 0; i < windowWidth; i += 30){
        for (j = 0; j < windowHeight; j += 30)

            grid.rect(i, j, 30)
    }
}

