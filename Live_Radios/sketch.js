let radiostreams = ['https://s2.ssl-stream.com/radio/8170/radio.mp3',
    'http://media-ice.musicradio.com/Heart00sMP3',
    'https://gamershouse.hu/livemega.mp3',
    'https://media-ssl.musicradio.com/ClassicFMMP3',
    'http://streaming.radioplay.fi/fi_classic_128.mp3',
    'https://corus.leanstream.co/CJKRFM-MP3',
    'https://vprclassical.streamguys1.com/vprclassical24.mp3',
    'https://sc2.dubplate.fm/radio/8030/dnb/uhifi',
    'https://radio.drumandbassuk.com/listen/drum_and_bass_uk_radio/radio.mp3',
    'https://glizzys-drum-n-bass.stream.laut.fm/glizzys-drum-n-bass',
    'http://auxoisfm.ice.infomaniak.ch/auxoisfm-128.mp3',

    'https://knkx-live-a.edge.audiocdn.com/6285_128k',
    'https://streaming.broadcast.radio/onejazz',
    'http://streaming.radio.co:80/s774887f7b/listen',
    'http://jazz-wr01.ice.infomaniak.ch/jazz-wr01-128.mp3',
    'http://radio.wanderingsheep.tv:8000/jazzcafe',
    'https://kuvo-ice.streamguys1.com/kuvo-mp3-128',
    'http://stream.zeno.fm/mhexkyn5a5zuv',
    'http://kbem-live.streamguys1.com/kbem_mp3',
    'https://radio.canstream.co.uk:8075/live.mp3',
    'http://streams.80s80s.de/soul/mp3-192/'
]


let volumeslider = [];

let LiveStream = [];


let timer = 0;
let radioselect = 0;

function setup() {
    createCanvas(1000, 600);

    for (var i = 0; i < radiostreams.length; i+= 1){
        volumeslider[i] = createSlider(0, 1, 0, 0.01);
    }

    for (var i = 0; i < radiostreams.length; i+= 1){
        LiveStream[i] = createAudio(radiostreams[i])
        LiveStream[i].play()
    }


}

function draw() {
    background(220);


    for (var i = 0; i < radiostreams.length; i+= 1){
        LiveStream[i].volume(volumeslider[i].value());
        volumeslider[i].position(10, i*25);

    }

    timer = frameCount * 0.2;
    if (timer % 2 == 0) {
        let prevRadioselect = radioselect;
        radioselect = floor(random(radiostreams.length));

        console.log(radioselect);

        for (let i = 0; i < radiostreams.length; i += 1) {
            if (i === radioselect) {
                volumeslider[i].value(1);
            } else {
                volumeslider[i].value(0);
            }
        }
    }


}