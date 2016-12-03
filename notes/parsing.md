
[**Posted on Stack Overflow**](http://stackoverflow.com/questions/40902864/how-to-parse-web-midi-api-input-messages-onmidimessage)

How to parse Web Midi messages (onmidimessage)
==============================================

How can I parse basic information out of a `MIDIMessageEvent`?

  - command
  - channel
  - note
  - velocity

How might I interpret the parsed information for basic MIDI events?

  - onNote
  - onPad
  - onPitchBend
  - onModWheel

The `data` in a `MIDIMessageEvent` can be split up with a **parsing function** like this:

    /**
     * Parse basic information out of a MIDI message.
     */
    function parseMidiMessage(message) {
      return {
        command: message.data[0] >> 4,
        channel: message.data[0] & 0xf,
        note: message.data[1],
        velocity: message.data[2] / 127
      }
    }

Given **some event functions** for handling basic MIDI events:

    function onNote(note, velocity) {}
    function onPad(pad, velocity) {}
    function onPitchBend(value) {}
    function onModWheel(value) {}

We might use the parsing function from above to **interpret through MIDI messages** and call the event functions above:

    /**
     * Handle a MIDI message from a MIDI input.
     */
    function handleMidiMessage(message) {

      // Parse the MIDIMessageEvent.
      const {command, channel, note, velocity} = parseMidiMessage(message)

      // Stop command.
      // Negative velocity is an upward release rather than a downward press.
      if (command === 8) {
        if      (channel === 0) onNote(note, -velocity)
        else if (channel === 9) onPad(note, -velocity)
      }

      // Start command.
      else if (command === 9) {
        if      (channel === 0) onNote(note, velocity)
        else if (channel === 9) onPad(note, velocity)
      }

      // Knob command.
      else if (command === 11) {
        if (note === 1) onModWheel(velocity)
      }

      // Pitch bend command.
      else if (command === 14) {
        onPitchBend(velocity)
      }
    }

Assumingly the handler is attached to the correct MIDI input(s):

    midiInput.onmidimessage = message => handleMidiMessage(message)

Resources:

  - [Web MIDI API](http://webaudio.github.io/web-midi-api/)
  - [MIDI message data summary](https://www.midi.org/specifications/item/table-1-summary-of-midi-message)
  - [Script by `cwilso`](https://github.com/cwilso/midi-synth/blob/master/js/midi.js)
  - [Script by `cotejp`](https://github.com/cotejp/webmidi/blob/master/src/webmidi.js)
