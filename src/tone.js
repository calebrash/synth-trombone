let normalizeValue = (value, range) => {
    if (value > range[1]) {
        return range[1];
    }
    if (value < range[0]) {
        return range[0];
    }
    return value;
}

class Tone {
    constructor (padRange, frequencyRange) {
        let audioContext = AudioContext || webkitAudioContext;
        this.ctx = new audioContext();
        this.oscillator = null;
        this.isPlaying = false;
        this.padRange = padRange;
        this.frequencyRange = frequencyRange;
        this.type = 'sine';
    }

    start () {
        if (!this.isPlaying) {
            this.isPlaying = true;
            this.oscillator = this.ctx.createOscillator();
            this.oscillator.connect(this.ctx.destination);
            this.oscillator.type = this.type;
            this.oscillator.start();
        }
    }

    stop () {
        if (this.isPlaying) {
            this.isPlaying = false;
            this.oscillator.stop();
        }
    }

    setFrequencyForValue (value) {
        value = normalizeValue(value, this.padRange);
        var p = (value / (this.padRange[1] - this.padRange[0])) + this.padRange[0];
        this.oscillator.frequency.value =
            ((this.frequencyRange[1] - this.frequencyRange[0]) * p) + this.frequencyRange[0];
    }
}

export { Tone };

