
import MidiListener from "./MidiListener"

navigator.requestMIDIAccess()

  .then(access => new MidiListener({
    access,
    onInputChange: inputs => console.log(`MIDI Inputs: [${inputs.join(", ")}]`),
    onMessage: message => console.log("Message:", message)
  }))

  .then(midiListener => {
    window["midi"] = midiListener
  })

  .catch(error => {
    error.message = `Midi listener failed to construct: ${error.message}`
    throw error
  })
