// ========================= CONFIG =========================
const OFF_W = 120;       // offscreen width (low-res)
const OFF_H = 50;        // offscreen height (low-res)
const MAX_BUBBLES = 100; // soft cap

let gfx;                 // offscreen buffer
let bubbles = [];

let offset = 0;

let rectW = 0;
let rectH = 0;
let rectCX = 0;
let rectCY = 0;

let mx = 0;              // smooth mouse
let my = 0;
let circleSize = 15;

let t = 0;

let hideballs = 100;
let hideballsadd = 0;

let textin = 6;

// clickable nav links
let links = [];

let pos = 0;

// section state
let currentSection = "home";
let queuedSection = null;

const SECTION_DATA = {
    home: {
        title: "I MAKE AUDIO TOOLS",
        body: ""
    },
    music: {
        title: "Music",
        body: ""
    },
    contact: {
        title: "Contact",
        body: ""
    },
    plugins: {
        title: "Plugins",
        body: ""
    }
};

// ========================= PRELOAD =========================
function preload() {
    CompoundMono = loadFont('CompoundMono.ttf');
}

// ========================= SETUP =========================
function setup() {
    noCursor();
    createCanvas(windowWidth, windowHeight);
    frameRate(60);
    pixelDensity(1);
    noSmooth();

    gfx = createGraphics(OFF_W, OFF_H);
    gfx.pixelDensity(1);
    gfx.noSmooth();
    gfx.drawingContext.filter = 'blur(3px)';

    for (let i = 0; i < 100; i++) {
        bubbles.push(new Bubble(gfx.width, gfx.height, random(gfx.width), random(gfx.height)));
    }

    recalcRect();
}

// ========================= DRAW =========================
function draw() {


    gfx.background(255);
    gfx.noStroke();
    for (let b of bubbles) {
        b.show(gfx);
    }

    // threshold / posterize-like effect
    gfx.loadPixels();
    for (let i = 0; i < gfx.pixels.length; i += 4) {
        const v = gfx.pixels[i];
        const bw = v < (t*0.6)? 0 : 255;
        gfx.pixels[i]     = (bw) ;
        gfx.pixels[i + 1] = (bw) ;
        gfx.pixels[i + 2] = (bw) ;

    }
    gfx.updatePixels();

    console.log(t)

    background(255);

    // main rect position
    const rectX = rectCX - rectW / 2;
    const rectY = rectCY - rectH / 2 + offset;

    // upscaled particles
    image(gfx, rectX, rectY, rectW, rectH);

    // frame
    noFill();
    stroke(0);
    strokeWeight(6);
    rectMode(CENTER);
    rect(rectCX, rectCY, rectW, rectH, 4);

    // central text (section title + body)

    textFont(CompoundMono)
    blendMode(DIFFERENCE);
    textAlign(CENTER, CENTER);
    textSize(rectW * 0.09);
    fill(255);
    noStroke();

    const textX = rectCX;
    const textY = rectCY + offset;
    text(SECTION_DATA[currentSection].title, textX, textY);

    // body text below title
    textSize(rectW * 0.001
    );
    textAlign(CENTER, TOP);
    text(SECTION_DATA[currentSection].body, textX, textY + rectH * 0.15);

    blendMode(BLEND);

    // debug bubbles count (top-left)
    textSize(40);
    fill(255, 0, 0);
    textAlign(CENTER);
    text(bubbles.length, 50, 50);

    // prepare for nav text
    textSize(rectW * 0.04);
    fill(0, 0, 0);
    textAlign(LEFT);

    // animate t
    t += textin;
    t = constrain(t, 0, 300);

    if (queuedSection && t === 0) {
        currentSection = queuedSection;
        queuedSection = null;
        textin = 6; // slide back in
    }

    // easing
    let ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - pow(-2 * x + 2, 3) / 2);

    // base progress for nav items
    let p1 = constrain((t - 0)  / 200, 0, 1);
    let p2 = constrain((t - 20) / 200, 0, 1);
    let p3 = constrain((t - 40) / 200, 0, 1);
    let p4 = constrain((t - 60) / 200, 0, 1);

    // smooth cursor
    const dX = mouseX - mx;
    const dY = mouseY - my;
    mx += dX / 1.4;
    my += dY / 1.4;

    // cull dead bubbles
    for (let i = bubbles.length - 1; i >= 0; i--) {
        if (bubbles[i].dead) {
            bubbles.splice(i, 1);
        }
    }

    // draw nav text
    let navY1 = windowHeight * 0.93;
    let navY2 = windowHeight * 0.80;
    let navY3 = windowHeight * 0.67;
    let navY4 = windowHeight * 0.54;

    let x1 = ease(p1) * 1000 - 1000;
    let x2 = ease(p2) * 1000 - 1000;
    let x3 = ease(p3) * 1000 - 1000;
    let x4 = ease(p4) * 1000 - 1000;

    text("Ewan Bristow", x1, navY1);
    text("Music",        x2, navY2);
    text("Contact",      x3, navY3);
    text("Plugins",      x4, navY4);

    // update clickable link data
    links = [
        { label: "Ewan Bristow", section: "home",    x: x1, y: navY1 },
        { label: "Music",        section: "music",   x: x2, y: navY2 },
        { label: "Contact",      section: "contact", x: x3, y: navY3 },
        { label: "Plugins",      section: "plugins", x: x4, y: navY4 },
    ];

    // cursor circle
    blendMode(DIFFERENCE);
    circleSize = mouseIsPressed ? 20 : 40;
    noStroke();
    fill(255);
    circle(mx, my, circleSize);
    blendMode(BLEND);
}

// ========================= RESIZE =========================
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    pixelDensity(1);
    recalcRect();
}

// ========================= DRAG TO ADD BUBBLES =========================
function mouseDragged() {
    const rectX = rectCX - rectW / 2;
    const rectY = rectCY - rectH / 2 + offset;

    const overRect =
        mouseX >= rectX &&
        mouseX <= rectX + rectW &&
        mouseY >= rectY &&
        mouseY <= rectY + rectH;

    if (!overRect) return;

    const nx = map(mouseX, rectX, rectX + rectW, 0, gfx.width);
    const ny = map(mouseY, rectY, rectY + rectH, 0, gfx.height);

    bubbles.push(new Bubble(gfx.width, gfx.height, nx, ny));
}

// ========================= HELPERS =========================
function recalcRect() {
    rectW = width - 30;
    rectH = height * 0.46;
    rectCX = width / 2;
    rectCY = height * 0.24;
}

// simple section transition trigger
function goToSection(name) {
    if (name === currentSection || queuedSection) return;
    queuedSection = name;
    textin = -6; // retract
}

// ========================= BUBBLE CLASS =========================
class Bubble {
    constructor(w, h, x, y) {
        this.canvasW = w;
        this.canvasH = h;
        this.x = x;
        this.y = y;
        this.vx = random(-0.3, 0.3);
        this.vy = random(-0.3, 0.3);
        this.r = random(1, 3);
        this.dead = false;
    }

    show(g) {
        this.x += this.vx;
        this.y += this.vy;

        const pad = this.r * 2;

        if (this.x < -pad) {
            if (bubbles.length > MAX_BUBBLES) this.dead = true;
            else this.x = g.width + pad;
        } else if (this.x > g.width + pad) {
            if (bubbles.length > MAX_BUBBLES) this.dead = true;
            else this.x = -pad;
        }

        if (this.y < -pad) {
            if (bubbles.length > MAX_BUBBLES) this.dead = true;
            else this.y = g.height + pad;
        } else if (this.y > g.height + pad) {
            if (bubbles.length > MAX_BUBBLES) this.dead = true;
            else this.y = -pad;
        }

        g.fill(0);
        g.circle(this.x, this.y, this.r * 4);
    }
}

// ========================= CLICK HANDLER =========================
function mouseClicked() {
    // use current textSize (same as nav)
    for (let link of links) {
        let tw = textWidth(link.label);
        let th = textSize(); // approximate height
        let tx = link.x;
        let ty = link.y - th / 2;

        if (
            mouseX > tx &&
            mouseX < tx + tw &&
            mouseY > ty &&
            mouseY < ty + th
        ) {
            console.log("Clicked:", link.label);
            goToSection(link.section);
        }
    }
}



//function mouseWheel(event) {
//  print(event.delta);
//  //move the square according to the vertical scroll amount
//  pos += event.delta/50;
//  //uncomment to block page scrolling
//  //return false;
//}

