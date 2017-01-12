
/// <reference path="../node_modules/midi-listener/source/web-midi.d.ts"/>

import MidiListener from "midi-listener"
import Synth from "./Synth"

(async () => {

  // Create a midi listener, which listens for midi keyboard activity.
  const midiListener = new MidiListener({access: await navigator.requestMIDIAccess()})

  // Create a synthesizer which itself subscribes to the midi listener.
  const synth = new Synth({midiListener})

  // Subscribe console loggers to interesting midi events.
  midiListener.subscribe({
    onInputChange: report => console.log("MIDI Input Change:", report.inputNames),
    onMessage: report => console.log("MIDI Message:", report),
    onNote: report => console.log(" - Note:", report),
    onPad: report => console.log(" - Pad:", report),
    onPitchBend: report => console.log(" - Pitch bend:", report),
    onModWheel: report => console.log(" - Mod wheel:", report)
  })
})()
