let mode = null;
let app = null;
let UZUImage;
let LOCDImage;

function preload() {
    UZUImage = createVideo("/img/uzu-website-video-two-compressed.mp4");
    UZUImage.hide();
    UZUImage.autoplay();
    UZUImage.loop();
    UZUImage.volume(0)
    const UZUHeight = windowHeight * 0.6;
    UZUImage.elt.onloadedmetadata = () => {
        const aspect = UZUImage.elt.videoWidth / UZUImage.elt.videoHeight;
        UZUImage.size(UZUHeight * aspect, UZUHeight);
    };

    LOCDImage = createVideo("/img/LOCD_WEBSITE_LOOP_BOTTOM.mp4");
    LOCDImage.hide();
    LOCDImage.autoplay();
    LOCDImage.loop();
    LOCDImage.volume(0)
    const LOCDHeight = windowHeight * 0.6;
    LOCDImage.elt.onloadedmetadata = () => {
        const aspect = LOCDImage.elt.videoWidth / LOCDImage.elt.videoHeight;
        LOCDImage.size(LOCDHeight * aspect, LOCDHeight);
    };



}

function setup() {
    createCanvas(windowWidth, windowHeight*3);
    switchMode(true);
}

function draw() {
    switchMode(false);
    app.update();
    app.render();
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight*3);
    switchMode(true);
    app.onResize?.();
}

function getMode() {
    return (windowWidth < windowHeight) ? "mobile" : "desktop";
}

function switchMode(force) {
    const newMode = getMode();
    if (!force && newMode === mode) return;

    mode = newMode;
    if (mode === "desktop") app = new DesktopScene();
    else app = new MobileScene();
}

/* ================= DESKTOP ================= */

class DesktopScene {
    constructor() {
        this.Timer = 0;
        this.BlockArray = [];
        this.blockColour = [];

        this.grid = createGraphics(windowWidth, windowHeight*3);
        this.textimage = createGraphics(windowWidth, windowHeight);

        this.createInitGrid();

        this.textimage.clear();
        this.textimage.fill(255);
        this.textimage.textSize(windowHeight * 0.2);
        this.textimage.textAlign(LEFT, TOP);
        this.textimage.text("I\nMake\nAudio\nTools", 20, 20);
    }

    update() {
        this.Timer++;

        if (this.Timer > random(20, 100)) {
            this.Timer = 0;
            this.BlockArray = [];
            this.blockColour = [
                random(0, 255),
                random(0, 255),
                random(0, 255),
            ];

            for (let i = 0; i < 40; i++) {
                this.BlockArray.push(new RandomBlock(this.blockColour));
            }
        }
    }

    render() {
        background(30);
        image(this.grid, 0, 0);

        noStroke();
        for (let i = 0; i < this.BlockArray.length; i++) {
            this.BlockArray[i].show();
        }

        image(this.textimage, 0, 0);

        // your colour sections
        push();
        fill(255, 133, 51);
        rect(0, windowHeight, windowWidth, windowHeight);

        rectMode(CENTER);

        rect(windowWidth * 0.5, windowHeight, 100, 100,20);

        imageMode(CENTER)
        image(UZUImage,windowWidth*0.2, windowHeight/2 + windowHeight)

        pop();

        // LOCD =============

        push();
        fill(255,255,255);
        rect(0, windowHeight * 2, windowWidth, windowHeight);

        rectMode(CENTER)
        rect(windowWidth * 0.5, windowHeight*2, 100, 100,20);

        imageMode(CENTER)
        image(LOCDImage,windowWidth*0.2, windowHeight/2 + windowHeight*2)
        pop();
    }

    onResize() {
        this.grid.resizeCanvas(windowWidth, windowHeight);
        this.textimage.resizeCanvas(windowWidth, windowHeight);
        this.createInitGrid();

        this.textimage.clear();
        this.textimage.textSize(windowHeight * 0.2);
        this.textimage.text("I\nMake\nAudio\nTools", 20, 20);

        const UZUHeight = windowHeight * 0.6;
        const aspect = UZUImage.elt.videoWidth / UZUImage.elt.videoHeight;
        UZUImage.size(UZUHeight * aspect, UZUHeight);
    }

    createInitGrid() {
        this.grid.clear();
        this.grid.noFill();
        this.grid.stroke(100);

        for (let i = 0; i < windowWidth; i += 30) {
            for (let j = 0; j < windowHeight; j += 30) {
                this.grid.rect(i, j, 30);
            }
        }
    }
}

/* ================= MOBILE ================= */

class MobileScene {
    constructor() {
        background(30)
        this.textimage = createGraphics(windowWidth, windowHeight);




    }
    update() {}
    render() {
        this.textimage.fill(255)
        this.textimage.textSize(200)
        this.textimage.textAlign(CENTER,CENTER)
        this.textimage.text("I\nMake\nAudio\nTools",windowWidth/2,windowHeight/2)
        image(this.textimage,0,0)
        noStroke()

        // your colour sections
        push();
        fill(255, 133, 51);
        rect(0, windowHeight, windowWidth, windowHeight);

        rectMode(CENTER);

        rect(windowWidth * 0.5, windowHeight, 100, 100,20);

        imageMode(CENTER)
        image(UZUImage,windowWidth/2, windowHeight/2 + windowHeight)

        pop();

        // LOCD =============

        push();
        fill(255,255,255);
        rect(0, windowHeight * 2, windowWidth, windowHeight);

        rectMode(CENTER)
        rect(windowWidth * 0.5, windowHeight*2, 100, 100,20);

        imageMode(CENTER)
        image(LOCDImage,windowWidth/2, windowHeight/2 + windowHeight*2)
        pop();

    }

    onResize() {}
}

/* ================= UTIL ================= */

class RandomBlock {
    constructor(col) {
        this.x = round(random(0, windowWidth) / 30) * 30;
        this.y = round(random(0, windowHeight) / 30) * 30;
        this.col = col;
    }

    show() {
        fill(this.col);
        rect(this.x, this.y, 30);
    }
}
