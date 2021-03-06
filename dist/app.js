(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _toneJs = require('./tone.js');

var pad = document.getElementById('soundpad'),
    padType = document.getElementById('soundpad-type'),
    padNumber = document.getElementById('soundpad-number');

var xRange = [0, pad.clientWidth],
    yRange = [0, pad.clientHeight],
    xFrequencyRange = [200, 1000],
    yFrequencyRange = [400, 800];

var tone1 = new _toneJs.Tone(xRange, xFrequencyRange),
    tone2 = new _toneJs.Tone(yRange, yFrequencyRange);

var toneActive = false;

var isSecondToneEnabled = function isSecondToneEnabled() {
    return padNumber.value === 'both';
};

var setTypeForTone = function setTypeForTone(tone) {
    return tone.type = padType.value;
};

var changeFrequency = function changeFrequency(e) {
    var x = e.offsetX;
    var y = e.offsetY;
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

var stopTone = function stopTone() {
    toneActive = false;
    if (tone1.isPlaying) {
        tone1.stop();
        if (isSecondToneEnabled()) {
            tone2.stop();
        }
    }
};

var shortcutHandler = function shortcutHandler(e) {
    switch (e.keyCode) {
        case 49:
            // 1
            padType.value = 'sine';
            break;
        case 50:
            // 2
            padType.value = 'square';
            break;
        case 51:
            // 3
            padType.value = 'sawtooth';
            break;
        case 52:
            // 4
            padType.value = 'triangle';
            break;
        case 90:
            // z
            padNumber.value = 'one';
            break;
        case 88:
            // x
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

},{"./tone.js":2}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, '__esModule', {
    value: true
});

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

var normalizeValue = function normalizeValue(value, range) {
    if (value > range[1]) {
        return range[1];
    }
    if (value < range[0]) {
        return range[0];
    }
    return value;
};

var Tone = (function () {
    function Tone(padRange, frequencyRange) {
        _classCallCheck(this, Tone);

        var audioContext = AudioContext || webkitAudioContext;
        this.ctx = new audioContext();
        this.oscillator = null;
        this.isPlaying = false;
        this.padRange = padRange;
        this.frequencyRange = frequencyRange;
        this.type = 'sine';
    }

    _createClass(Tone, [{
        key: 'start',
        value: function start() {
            if (!this.isPlaying) {
                this.isPlaying = true;
                this.oscillator = this.ctx.createOscillator();
                this.oscillator.connect(this.ctx.destination);
                this.oscillator.type = this.type;
                this.oscillator.start();
            }
        }
    }, {
        key: 'stop',
        value: function stop() {
            if (this.isPlaying) {
                this.isPlaying = false;
                this.oscillator.stop();
            }
        }
    }, {
        key: 'setFrequencyForValue',
        value: function setFrequencyForValue(value) {
            value = normalizeValue(value, this.padRange);
            var p = value / (this.padRange[1] - this.padRange[0]) + this.padRange[0];
            this.oscillator.frequency.value = (this.frequencyRange[1] - this.frequencyRange[0]) * p + this.frequencyRange[0];
        }
    }]);

    return Tone;
})();

exports.Tone = Tone;

},{}]},{},[2,1]);
