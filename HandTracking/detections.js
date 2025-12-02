
// detections is a global variable that contains the hand detection information
// the detections variable can be used in other files (like sketch.js)
let detections = {}
const videoElement = document.getElementById('input_video');

function gotHands(results) {
    detections = results;
    //console.log(detections);
}

const hands = new Hands({locateFile: (file) => {
        return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
    }});

hands.setOptions({
    maxNumHands: 2,
    modelComplexity: 1,
    minDetectionConfidence: 0.6,
    minTrackingConfidence: 0.1
});

hands.onResults(gotHands);

const camera = new Camera(videoElement, {
    onFrame: async () => {
        await hands.send({image: videoElement});
    },
    // do your detections on a lower resolution for better performance (but slightly reduced accuracy)
    width: 640,
    height: 320
});
camera.start();
