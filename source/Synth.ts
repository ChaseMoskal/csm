
import {NoteReport} from "midi-listener"
import * as Tone from "tone"

/**
 * Super simplistic synth, to verify that MIDI input is working.
 */
export default class Synth {

  private readonly instrument = new Tone.Synth({
    oscillator: {
      type: "pwm",
      modulationFrequency: 0.2
    },
    envelope: {
      attack: 0.02,
      decay: 0.1,
      sustain: 0.2,
      release: 0.9
    }
  }).toMaster()

  play({code, velocity, frequency}: NoteReport) {
    if (velocity > 0) this.instrument.triggerAttack(frequency, undefined, velocity * 2);
    else this.instrument.triggerRelease()
  }
}
