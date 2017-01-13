
import * as Tone from "tone"
import MidiListener, {NoteReport} from "midi-listener"

/**
 * Options for an instrument.
 */
export interface InstrumentOptions {

  /** Midi listener which reports notes for the instrument to play. */
  midiListener: MidiListener
}

/**
 * Synthesizer which plays notes in accordance to the provided midi listener.
 */
export default class Synth {

  /** Tone JS instrument. */
  private instrument

  /**
   * Create a synthesizer.
   */
  constructor({midiListener}: InstrumentOptions) {

    // Subscribe to midi listener.
    midiListener.subscribe({

      // Play notes.
      onNote: report => this.play(report)
    })

    // Initialize the Tone JS instrument.
    this.instrument = new Tone.PolySynth(6, Tone.Synth)
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
    })
    this.instrument.toMaster()
  }

  /**
   * Play the provided note report.
   */
  private play({code, velocity, frequency}: NoteReport) {
    if (velocity > 0)
      this.instrument.triggerAttack(frequency, undefined, velocity * 2)
    else
      this.instrument.triggerRelease(frequency)
  }
}
