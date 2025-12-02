let TREE;

let rotateamount = 0
let branch2rotate = 0

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    angleMode(degrees)
    branch(100)
    rotateamount = random(0,2)
    branch2rotate = random(1,2)

    let b = createButton("Re-Generate")
    b.mousePressed(RandomNumber);

    b.position(0,0)


}

function draw() {
    background(220);
    fill(0)
    translate(0,200,0);

    push()

    stroke(115, 156, 40)
    fill(115, 156, 40)
    rotateX(PI/2)
    plane(1000,1000,1)

    pop()

    branch(50)
    orbitControl()
}

function branch(length){
    line(0,0,0,0,-length,0)


    strokeWeight(map(length,1,200,0.4,100))
    stroke(84, 42, 13)
    translate(0,-length, 0)

    if (length > 5){
        rotateY(rotateamount);

        push()
        rotateZ(0.7 );

        if (length > 20){
            branch(length * 0.8)
            rotate(branch2rotate)
        }
        branch(length * 0.8)
        rotateX(1)
        pop()

    }


    if (length < 20){
        strokeWeight(1)
        fill(115, 156, 40)
        ellipse(0, 0, 5, 8);
    }


}

function RandomNumber(){
    rotateamount = random(0,2)
    branch2rotate = random(1,2)
    branch(50)
}

