(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var pad = document.getElementById('soundpad'),
    padType = document.getElementById('soundpad-type');

var ctx = new webkitAudioContext(),
    osc,
    isPlayingAudio = false,
    xFrequency = [200, 1000],
    yFrequency = [100, 2000],
    xRange = [0, 300],
    yRange = [0, 300];

var getFrequency = function getFrequency(x, y) {
    var px = x / xRange[1];
    var py = y / yRange[1];
    var fx = (xFrequency[1] - xFrequency[0]) * px + xFrequency[0];
    var fy = (yFrequency[1] - yFrequency[0]) * px + yFrequency[0];
    return (fx + fy) / 2;
};

var handleFrequencyChange = function handleFrequencyChange(e) {
    if (!isPlayingAudio) {
        isPlayingAudio = true;
        osc = ctx.createOscillator();
        osc.connect(ctx.destination);
        osc.type = padType.value;
        osc.frequency.value = getFrequency(e.offsetX, e.offsetY);
        osc.start();
    } else {
        requestAnimationFrame(function () {
            osc.frequency.value = getFrequency(e.offsetX, e.offsetY);
        });
    }
};

var handleStopAudio = function handleStopAudio() {
    if (isPlayingAudio) {
        isPlayingAudio = false;
        osc.stop();
    }
};

pad.addEventListener('mousemove', handleFrequencyChange);
pad.addEventListener('mouseleave', handleStopAudio);
pad.addEventListener('touchstart', handleFrequencyChange);
pad.addEventListener('touchend', handleStopAudio);

},{}]},{},[1]);
