let bubbleswindow;
let scaleFactor = 10;
let bubbleswindowNeedsUpdate = false;

let bubbles = [];
function setup() {
    pixelDensity(1);
    createCanvas(windowWidth, windowHeight);
    frameRate(90);
    noSmooth();
    bubbleswindow = createGraphics(
        floor(windowWidth / scaleFactor),
        floor(400/ scaleFactor)
    );
    bubbleswindow.pixelDensity(1);
    bubbleswindow.drawingContext.filter = 'blur(3px)';

    for (var i = 0; i < 40; i += 1){
        let b = new bubble(random(0, windowWidth/10), random(0, windowHeight/10) );
        bubbles.push(b);
    }
}

function draw() {

    if (frameCount % 3 === 0) {
        bubbleswindowNeedsUpdate = true;
    }

    if (bubbleswindowNeedsUpdate) {
        console.log(bubbles.length)
        bubbleswindow.background(255);
        bubbleswindow.noStroke();
        for (let b of bubbles) b.show(bubbleswindow);
        bubbleswindow.background(0);

        bubbleswindow.fill(255)
        for (let i = bubbles.length - 1; i >= 0; i--) {
            bubbles[i].show();
            if (bubbles[i].dead) {
                bubbles.splice(i, 1);
            }
        }

        bubbleswindow.loadPixels();
        for (let i = 0; i < bubbleswindow.pixels.length; i += 4) {
            const v = bubbleswindow.pixels[i];
            const bw = v < 128 ? 0 : 255;
            bubbleswindow.pixels[i] = bw;
            bubbleswindow.pixels[i + 1] = bw;
            bubbleswindow.pixels[i + 2] = bw;
        }
        bubbleswindow.updatePixels();
        image(bubbleswindow, 0, 0, width, 400);
        bubbleswindowNeedsUpdate = false;
    }
}
class bubble{
    constructor(x,y){
        this.x = x;
        this.y = y;
        this.xvel = random(-0.4, 0.4);
        this.yvel = random(-0.4, 0.4);
        this.r = random(5, 20);
    }
    show(){

        if(this.x > bubbleswindow.width+this.r){
            this.x = 0-this.r
            if (bubbles.length > 30){
                this.dead = true;
            }
        }
        if(this.x < 0-this.r){
            this.x = bubbleswindow.width+this.r
            if (bubbles.length > 30){
                this.dead = true;
            }
        }
        if(this.y > bubbleswindow.height+this.r){
            this.y = 0-this.r;
            if (bubbles.length > 30){
                this.dead = true;
            }
        }
        if(this.y < 0-this.r){
            this.y = bubbleswindow.height+this.r;
            if (bubbles.length > 30){
                this.dead = true;
            }
        }

        fill(255)
        this.x += this.xvel;
        this.y += this.yvel;
        bubbleswindow.circle(this.x, this.y, this.r);
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    bubbleswindow = createGraphics(
        floor(windowWidth / scaleFactor),
        floor(400/ scaleFactor)
    );
}

function mouseDragged(){
    let b = new bubble(mouseX/scaleFactor, mouseY/scaleFactor);
    bubbles.push(b);
}

