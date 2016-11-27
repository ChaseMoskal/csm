"use strict";
var Tone = require("tone");
/**
 * Synthesizer which plays notes in accordance to the provided midi listener.
 */
var Synth = (function () {
    /**
     * Create a synthesizer.
     */
    function Synth(_a) {
        var midiListener = _a.midiListener;
        var _this = this;
        // Play notes from the midi listener.
        midiListener.subscribe({ onNote: function (report) { return _this.play(report); } });
        // Initialize the Tone JS instrument.
        this.instrument = new Tone.PolySynth(6, Tone.Synth);
        this.instrument.set({
            oscillator: {
                type: "pwm",
                modulationFrequency: 0.4
            },
            envelope: {
                attack: 0.02,
                decay: 0.1,
                sustain: 0.2,
                release: 0.5
            }
        });
        this.instrument.toMaster();
    }
    /**
     * Play the provided note report.
     */
    Synth.prototype.play = function (_a) {
        var code = _a.code, velocity = _a.velocity, frequency = _a.frequency;
        if (velocity > 0)
            this.instrument.triggerAttack(frequency, undefined, velocity * 2);
        else
            this.instrument.triggerRelease(frequency);
    };
    return Synth;
}());
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Synth;
//# sourceMappingURL=Synth.js.map