let x = 0;
let y = 0;
let spdx = 0;
let spdy =0;
let held = false;


function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER)
    x = windowWidth/2
    y = windowHeight /2
    envelope = 100
}

function draw() {
    background(10,10,10,100);


    if (held == true){
        spdx = mouseX - pmouseX
        spdy = mouseY - pmouseY
        x = mouseX
        y = mouseY
        rect(x,y,100)
    }

    else{

        spdx *= 0.97
        spdy *= 0.97
        x += (spdx * 0.97)
        y += (spdy * 0.97)

        rect(x,y,100)


        if (x > windowWidth){
            spdx *= -1
            x = windowWidth - 10
            trigger = true
        }
        else if (x < 0){
            spdx *= -1
            x = 10
            trigger = true
        }
        else if (y > windowHeight){
            spdy *= -1
            y = windowHeight - 10
            trigger = true
        }
        else if (y < 0){
            spdy *= -1
            y = 10
            trigger = true
        }
    }

}

function mousePressed(){
    spdx = mouseX - pmouseX
    spdy = mouseY - pmouseY
    held = true
}

function mouseReleased(){
    held = false
}


