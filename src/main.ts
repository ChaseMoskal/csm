
/// <reference path="../node_modules/midi-listener/source/web-midi.d.ts"/>

import MidiListener from "midi-listener"

(async function() {

  const midiListener = window["midiListener"] = new MidiListener({
    access: await navigator.requestMIDIAccess(),
    onInputChange: inputs => console.debug(`MIDI Inputs: [${inputs.join(", ")}]`),
    onParse: parse => console.debug(`Midi listener parse:`, parse),
    onNote: (note, velocity) => console.log(` - Note:`, note, ',', velocity.toFixed(2)),
    onPad: (pad, velocity) => console.log(` - Pad:`, pad, ',', velocity.toFixed(2)),
    onPitchBend: value => console.log(` - Pitch bend:`, value.toFixed(2)),
    onModWheel: value => console.log(` - Mod wheel:`, value.toFixed(2))
  })
})()
