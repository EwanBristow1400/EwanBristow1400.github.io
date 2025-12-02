let embeddings = [];
let umap;
let umapResults;
let umapRunning = false;

function setup() {
    createCanvas(windowWidth, windowHeight, WEBGL);

    for (let i = 0; i < 5000; i++) {
        let data = [random(0, 255), random(0, 255),random(0, 255),random(0, 255),random(0, 255),random(0, 255)];
        embeddings.push(data);
    }

    umap = new UMAP({
        nComponents: 3,
        nNeighbors: 10,
    });

    umap.initializeFit(embeddings);

    button = createButton("Start");
    button.mousePressed(startUmap);
    button.position(10,10)
}

function draw() {
    background(0);

    if (umapRunning) {
        umapRunning = umap.step();
        umapResults = umap.getEmbedding();

        if (umapRunning) {
            orbitControl();
            for (let i = 0; i < umapResults.length; i++) {
                let dataPoint = umapResults[i];
                let x = dataPoint[0] * 100;
                let y = dataPoint[1] * 100;
                let z = dataPoint[2] * 100;

                push();
                noStroke();
                translate(x, y, z);
                fill(embeddings[i][0], embeddings[i][1], embeddings[i][2]);

                sphere(3);
                pop();
            }
        }
    }
}

function startUmap() {
    umapRunning = true;
}