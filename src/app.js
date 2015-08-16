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

let toneActive = false;

let isSecondToneEnabled = () => padNumber.value === 'both';

let setTypeForTone = (tone) => tone.type = padType.value;

let changeFrequency = (e) => {
    let x = e.offsetX;
    let y = e.offsetY;
    toneActive = true;
    if (!tone1.isPlaying) {
        setTypeForTone(tone1);
        tone1.start();
        tone1.setFrequencyForValue(x);
        if (isSecondToneEnabled()) {
            setTypeForTone(tone2);
            tone2.start();
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
    toneActive = false;
    if (tone1.isPlaying) {
        tone1.stop();
        if (isSecondToneEnabled()) {
            tone2.stop();
        }
    }
};

let shortcutHandler = function (e) {
    switch (e.keyCode) {
        case 49: // 1
            padType.value = 'sine';
            break;
        case 50: // 2
            padType.value = 'square';
            break;
        case 51: // 3
            padType.value = 'sawtooth';
            break;
        case 52: // 4
            padType.value = 'triangle';
            break;
        case 90: // z
            padNumber.value = 'one';
            break;
        case 88: // x
            padNumber.value = 'both';
            break;
    }
    tone1.stop();
    setTypeForTone(tone1);
    if (toneActive) {
        tone1.start();
    } else {
        tone1.stop();
    }
    if (isSecondToneEnabled()) {
        tone2.stop();
        setTypeForTone(tone2);
        if (toneActive) {
            tone2.start();
        } else {
            tone2.stop();
        }
    } else {
        tone2.stop();
    }
};


pad.addEventListener('mousemove', changeFrequency);
pad.addEventListener('mouseleave', stopTone);
window.addEventListener('keydown', shortcutHandler);
