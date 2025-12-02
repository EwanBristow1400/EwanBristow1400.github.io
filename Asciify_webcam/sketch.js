let density = '@#W$9876543210?!abc;:+=-,_.'

let greyscale = 0

function preload(){
    screenshot = createCapture(VIDEO);
}

function setup() {
    createCanvas(windowWidth, windowHeight);

    slider = createSlider(10, 100, 0, 1)
    screenshot.size(windowWidth,windowHeight)
}

function draw() {
    screenshot.loadPixels();
    background(220);

    let w = width / screenshot.width;
    let h = height / screenshot.height;

    for(var i = 0; i < screenshot.width; i+= slider.value()){
        for(var j = 0; j < screenshot.height; j+= slider.value()){

            const PixelIndex = (i + j * screenshot.width) * 4;
            //pixel array
            const r = screenshot.pixels[PixelIndex + 0];
            const g = screenshot.pixels[PixelIndex + 1];
            const b = screenshot.pixels[PixelIndex + 2];

            greyscale = (r+g+b) / 3;
            greyscale = int(map(greyscale,255,0,0,density.length))


            textSize(slider.value())
            text(density[greyscale], i , j);

        }
    }


}