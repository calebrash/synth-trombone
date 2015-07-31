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

var isSecondToneEnabled = function isSecondToneEnabled() {
    return padNumber.value === 'both';
};

var changeFrequency = function changeFrequency(e) {
    var x = e.offsetX || e.changedTouches[0].clientX;
    var y = e.offsetY || e.changedTouches[0].clientY;
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

var stopTone = function stopTone() {
    if (tone1.isPlaying) {
        tone1.stop();
        if (isSecondToneEnabled()) {
            tone2.stop();
        }
    }
};

pad.addEventListener('mousemove', changeFrequency);
pad.addEventListener('mouseleave', stopTone);

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
