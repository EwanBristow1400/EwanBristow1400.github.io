let cam;
let distances = []

let x = 0;
let y = 0;

let ctrl_distances = [];


function setup() {
    createCanvas(windowWidth, windowWidth * 0.75);
    noStroke();
    //camera shenanigans!
    cam = createCapture(VIDEO);
    cam.size(windowWidth, windowWidth * 0.75);
    cam.hide()
}

function draw(){

    clear();

    //flip that shit

    push();
    translate(width,0);
    scale(-1, 1);
    image(cam, 0, 0, windowWidth, windowWidth*0.75);
    pop();

    ctrl_distances = []

    if (detections.multiHandLandmarks !== undefined) {
        for (const hand of detections.multiHandLandmarks) {
            let keyPointIndex = 0;
            for (let i = 1; i < hand.length; i++) {

                if (i == 4){ //Middle finder
                    fill(255)
                }
                else if (i == 8){ //Index Finger
                    fill(255)
                }
                else if (i == 12){ //middle finder
                    fill(255)
                }
                else if (i == 16){ //middle finder
                    fill(255)
                }
                else if (i == 20){ //middle finder
                    fill(255)
                }


                let pointx = processX(hand[i].x)
                let pointy = processY(hand[i].y)

                let prevpointx = processX(hand[i-1].x)
                let prevpointy = processY(hand[i-1].y)


                if (((i -1) % 4) !== 0){
                    push()
                    stroke(255)
                    strokeWeight(1)
                    line(prevpointx, prevpointy, pointx, pointy)
                    pop()
                }

                if ( ((i-1) % 4) == 0){
                    push()
                    fill(0)
                    circle(pointx, pointy, 20)
                    pop()
                }



                d = dist(processX(hand[4].x),
                    processX(hand[4].y),
                    processX(hand[8].x),
                    processX(hand[8].y))

                let s_dist = dist(processX(hand[5].x),
                    processX(hand[5].y),
                    processX(hand[9].x),
                    processX(hand[9].y))
                d_dist = map(s_dist, 10, 120,0,127)
                d_dist = constrain(d_dist,0,127)




                circlex = (processX(hand[4].x) +  processX(hand[8].x))/ 2
                circley = (processY(hand[4].y) +  processY(hand[8].y))/ 2

                push()
                noFill()
                stroke(255,0,0)
                circle(circlex,circley,d/2)
                pop()

                circle(pointx, hand[i].y *
                    (windowWidth * 0.5)+
                    windowWidth/8, 15);
            }

            ctrl_distances.push(d);
        }

        if (detections.multiHandLandmarks.length > 1) {
            // store the left and right hands in their own variables
            let leftHand, rightHand;
            if (detections.multiHandedness[0].label == "Left") {
                leftHand = detections.multiHandLandmarks[1];
                rightHand = detections.multiHandLandmarks[0];
            } else {
                leftHand = detections.multiHandLandmarks[0];
                rightHand = detections.multiHandLandmarks[1];
            }
        }
    }

    else {
        clear();
    }
}

//functions for processing points!!! refactor at some point

function processX(inx){
    inx *=  windowWidth
    inx *= -1
    inx += windowWidth
    return(inx)
}

function processY(iny){
    iny *= (windowWidth * 0.5)
    iny += (windowWidth/8)
    return(iny)
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}