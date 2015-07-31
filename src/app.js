import { Tone } from './tone.js';


let pad = document.getElementById('soundpad'),
    padType = document.getElementById('soundpad-type'),
    padNumber = document.getElementById('soundpad-number');

let xRange = [0, pad.clientWidth],
    yRange = [0, pad.clientHeight],
    xFrequencyRange = [200, 1000],
    yFrequencyRange = [400, 800];

let tone1 = new Tone(xRange, xFrequencyRange),
    tone2 = new Tone(yRange, yFrequencyRange);

let isSecondToneEnabled = () => {
    return padNumber.value === 'both';
}

let changeFrequency = (e) => {
    let x = e.offsetX || e.changedTouches[0].clientX;
    let y = e.offsetY || e.changedTouches[0].clientY;
    if (!tone1.isPlaying) {
        tone1.start();
        tone1.type = padType.value;
        tone1.setFrequencyForValue(x);

        if (isSecondToneEnabled()) {
            tone2.start();
            tone2.type = padType.value;
            tone2.setFrequencyForValue(y);
        }
    } else {
        requestAnimationFrame(function () {
            tone1.setFrequencyForValue(x);
            if (isSecondToneEnabled()) {
                tone2.setFrequencyForValue(y);
            }
        });
    }
};

let stopTone = () => {
    if (tone1.isPlaying) {
        tone1.stop();
        if (isSecondToneEnabled()) {
            tone2.stop();
        }
    }
};


pad.addEventListener('mousemove', changeFrequency);
pad.addEventListener('mouseleave', stopTone);
