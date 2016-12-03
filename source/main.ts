
/// <reference path="../node_modules/midi-listener/source/web-midi.d.ts"/>

import MidiListener from "midi-listener"
import Synth from "./Synth"

(async function() {

  const synth = new Synth()

  new MidiListener({
    access: await navigator.requestMIDIAccess(),
    onInputChange: report => console.log("MIDI Input Change:", report.inputNames),
    onMessage: report => console.log("MIDI Message:", report),
    onNote: report => {
      console.log(" - Note:", report)
      synth.play(report)
    },
    onPad: report => console.log(" - Pad:", report),
    onPitchBend: report => console.log(" - Pitch bend:", report),
    onModWheel: report => console.log(" - Mod wheel:", report)
  })
})()
