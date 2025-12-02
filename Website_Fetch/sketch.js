const PING_INTERVAL = 2000; // ms between pings

const urls = [
    "https://www.nicovideo.jp/",
    "https://www.ewanbristow.com/",
    "https://www.google.com/",
    "https://www.networkrail.com",
    "https://uk.yahoo.com/",
    "https://twitter.com",
    "https://www.ubereats.com",
    "https://apple.com",
    "https://nvidia.com",
    "https://plugdata.org",
    "https://ableton.com",
    "https://www.dbsinstitute.ac.uk",
    "https://bandcamp.com",
    "https://amazon.com",
    "https://wikipedia.org",
    "https://p5js.org",
    "https://www.instagram.com/"
];

let latencies = []; // one latency per url

function setup() {
    createCanvas(windowWidth, windowHeight)

    ping = createGraphics(windowWidth, windowHeight);
    ping.textAlign(LEFT, CENTER);
    ping.textFont("monospace");
    ping.noStroke();
    // init latencies
    for (let i = 0; i < urls.length; i++) {
        latencies[i] = 0;
    }

    // ping them regularly
    setInterval(pingAllServers, PING_INTERVAL);


}

async function pingAllServers() {
    // sequentially ping each URL
    for (let i = 0; i < urls.length; i++) {
        const t0 = performance.now();
        try {
            await fetch(urls[i], { mode: "no-cors", cache: "no-store" });
            const t1 = performance.now();
            const raw = t1 - t0;
            latencies[i] = constrain(raw, 0, 2000);

        } catch (e) {
            latencies[i] = 2000;
            console.log(`Ping failed for ${urls[i]}`);
        }
    }
}

function draw() {


    background(0)
    const margin = 10;
    const sliderWidth = 100;
    const sliderHeight = 10;
    const gap = 40;

    for (let i = 0; i < urls.length; i++) {
        const y = margin + i * gap;

        ping.textSize(10)
        ping.text(urls[i], margin, y);

        const xSlider = margin;
        const ySlider = y + 18;
        ping.fill(50);
        ping.rect(xSlider, ySlider, sliderWidth, sliderHeight);

        const latency = latencies[i];
        const norm = map(latency, 50, 1000, 1, 0, true); // tweak bounds
        const fillWidth = sliderWidth * norm;


        ping.rect(xSlider, ySlider, fillWidth, sliderHeight);

        ping.fill(255);
        ping.text(
            `${latency.toFixed(1)} ms`,
            xSlider + sliderWidth + 10,
            ySlider + sliderHeight / 2
        );
    }
    image(ping,0,0)
}


