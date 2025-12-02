
let pointarray = []
let pointsA = []
let pointsB = []
let pointsMerge = []

function preload(){
    Model = loadModel('UTAH_BLEND.obj')
    Model2 = loadModel('12265_Fish_v1_L2.obj')
}

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    for (let i = 0; i < Model.vertices.length; i++) {
        let a = Model.vertices[i]
        pointsA.push(createVector(a.x*3, a.y*3, a.z*3))

        let b = Model2.vertices[i]
        pointsB.push(createVector(b.x, b.y, b.z))

        pointsMerge.push(vertex())
    }

    slider = createSlider(0,1,0,0.01)
    slider.position(10,10)
}

function draw() {
    background(30);
    orbitControl()
    rotateY(frameCount*0.01)

    for(var i = 0; i < pointsMerge.length; i ++){

        stroke(255)
        strokeWeight(0.1)

        pointsMerge[i].x = lerp(pointsA[i].x,
            pointsB[i].x,
            slider.value()) * 10

        pointsMerge[i].y = lerp(pointsA[i].y,
            pointsB[i].y,
            slider.value()) * 10

        pointsMerge[i].z = lerp(pointsA[i].z,
            pointsB[i].z,
            slider.value()) * 10

        point(pointsMerge[i].x, pointsMerge[i].y, pointsMerge[i].z)


    }
}