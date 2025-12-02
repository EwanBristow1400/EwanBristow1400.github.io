let bloblist = [];
let points;

function setup() {
    createCanvas(windowWidth, windowHeight);
    canv = createGraphics(windowWidth, windowHeight );
    canv.drawingContext.filter = 'blur(10px)'
    for(var i = 0; i < 30; i += 1){
        let b = new blob();
        bloblist.push(b);
    }

    canv.fill(0);
}

function draw() {
    canv.background(200);


    for(var i = 0; i < bloblist.length; i += 1){
        bloblist[i].show();
    }

    image(canv, 0, 0);
    filter(POSTERIZE, 2);
}

class blob {
    constructor() {
        this.destx = int(random(2, 8))
        this.desty = int(random(2, 8))

        this.x = this.destx;
        this.y = this.desty;

        this.timer = int(random(0, 100));
    }

    show() {
        this.timer++;
        if (this.timer > 100) {
            this.move();
            this.timer = 0;
        }

        this.x = lerp(this.x, this.destx, 0.1);
        this.y = lerp(this.y, this.desty, 0.1);

        canv.rect(this.x * 50  , this.y  * 50, 25);
    }

    move() {
        this.movedir = random(0, 20);

        if (this.movedir > 10) {

            if (this.destx >= 7) {
                this.destx -= 1;
            } else if (this.destx <= 2) {
                this.destx += 1;
            } else {
                this.destx += random([-1, 1]);
            }
        } else {

            if (this.desty >= 7) {
                this.desty -= 1;
            } else if (this.desty <= 2) {
                this.desty += 1;
            } else {
                this.desty += random([-1, 1]);
            }
        }
    }
}
