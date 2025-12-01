let boxesArray = [];

let options = {
    friction: 0.1,
    restitution: 0.1,
};

let Engine = Matter.Engine,
    Runner = Matter.Runner,
    Bodies = Matter.Bodies,
    Composite = Matter.Composite,
    Mouse = Matter.Mouse,
    MouseConstraint = Matter.MouseConstraint;

let engine = Engine.create();
let runner = Runner.create();

let ground, leftwall, rightwall;
let mConstraint; // mouse constraint

Runner.run(runner, engine);

function setup() {
    // store the canvas so we can give it to Matter.Mouse
    let canvas = createCanvas(windowWidth, windowHeight);

    ground = Bodies.rectangle(windowWidth / 2, windowHeight, windowWidth, 60, {
        isStatic: true,
    });

    leftwall = Bodies.rectangle(0, windowHeight / 2, 10, windowHeight, {
        isStatic: true,
    });

    rightwall = Bodies.rectangle(windowWidth, windowHeight / 2, 10, windowHeight, {
        isStatic: true,
    });

    Composite.add(engine.world, [ground, leftwall, rightwall]);


    let canvasMouse = Mouse.create(canvas.elt);

    canvasMouse.pixelRatio = pixelDensity();

    mConstraint = MouseConstraint.create(engine, {
        mouse: canvasMouse,
        constraint: {
            stiffness: 0.2,
            render: { visible: false }, // no line drawn
        },
    });

    Composite.add(engine.world, mConstraint);
}

function draw() {
    background(50);

    // draw all boxes
    for (let i = 0; i < boxesArray.length; i++) {
        boxesArray[i].show();
    }


    if (mouseIsPressed == true){

        let b = new createBox();
        boxesArray.push(b);

    }

}

class createBox {
    constructor() {
        this.height = 5 ;
        this.width =  5;

        this.rectangle = Bodies.circle(
            mouseX,
            mouseY,
            this.width / 2,
            options
        );

        this.colour = [random(0,255),random(0,255),random(0,255)]

        Composite.add(engine.world, this.rectangle);
    }

    show() {
        push();
        translate(this.rectangle.position.x, this.rectangle.position.y);
        rotate(this.rectangle.angle);
        rectMode(CENTER);
        fill(this.colour); // make it visible
        circle(0, 0, this.width, this.height);
        pop();
    }
}



