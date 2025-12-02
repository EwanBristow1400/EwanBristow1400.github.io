

let values = ['1','f','g','@','4','k','o','{','s','c','2','~','G','R','K','X','L','E','+','']
let timer = 0
let movingarray = []

function setup() {

    createCanvas(windowWidth, windowHeight);
    textbuffer = createGraphics(windowWidth,windowHeight)
    textlines = createGraphics(windowWidth,windowHeight)

    textlines.textSize(10)
    textbuffer.textSize(10)
    textbuffer.fill(0)

    CreateText()

    for (var i = 0; i < 20; i ++){
        let c = new textmover()
        movingarray.push(c)
    }
}

function draw() {

    textlines.background(255,255,255, 10)
    textlines.fill(0,0,0, 255)
    textlines.rectMode(CENTER)


    image(textbuffer,0,0)
    image(textlines,0,0)
    timer ++

    if (timer % 100 == 0){
        CreateText()
    }

    for (var i = 0; i < movingarray.length; i ++){
        movingarray[i].show()
    }

}

function CreateText(){
    textbuffer.background(255)
    for (let i = 0; i < windowWidth; i += 10){
        for (let j = 0; j< windowHeight; j += 10){
            stroke(0)
            textbuffer.text(random(values),i,j)

        }
    }
}


class textmover{
    constructor(){


        this.x = random(0, windowWidth)
        this.y = random(0, windowHeight)
        this.speedx = random([-10,10])
        this.speedy = random([-10,10])
        this.timer = (random(0, 100))

    }

    show(){
        if ((this.x > windowWidth) || (this.x < 1)){this.speedx *= -1}
        if ((this.y > (windowHeight) -1 ) || (this.y < 1)){this.speedy *= -1}

        if (this.timer > 100){this.timer = 0; this.direction = random(0,2000);}

        this.timer ++
        if (this.direction > 1000){
            this.x += this.speedx
        } else{
            this.y += this.speedy
        }

        textlines.stroke(255)
        textlines.fill  (0)


        textlines.text(random(values), (round(this.x/10) * 10), (round(this.y/10) *10))
    }


}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    textbuffer.resizeCanvas(windowWidth,windowHeight)
    textlines.resizeCanvas(windowWidth,windowHeight)
}