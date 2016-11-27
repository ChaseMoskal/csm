
/**
 * Options for creating a midi listener.
 * Contains midi access object, and callbacks for handling midi events.
 */
export interface MidiListenerOptions {

  /** MIDI access provided by `navigator.requestMIDIAccess`. */
  access: MIDIAccess

  /** Called whenever a MIDI message event is received from any input. */
  onMessage: (message: MIDIMessageEvent) => void

  /** Called whenever a MIDI input device is connected or disconnected, and also initially. */
  onInputChange: (inputNames: string[]) => void
}

/**
 * Listen for midi messages from all connected input devices.
 */
export default class MidiListener {
  private readonly access: MIDIAccess
  private readonly onMessage: (message: MIDIMessageEvent) => void
  private readonly onInputChange: (inputNames: string[]) => void
  private numberOfOpenConnections: number

  /**
   * Create a midi listener.
   */
  constructor(options: MidiListenerOptions) {
    this.access = options.access
    this.onMessage = options.onMessage
    this.onInputChange = options.onInputChange

    // Prepare midi inputs initially and whenever an input is connected or disconnected.
    this.curateMidiInputs()
    this.access.onstatechange = () => this.curateMidiInputs()
  }

  /**
   * Prepare midi inputs for our listening purposes.
   */
  private curateMidiInputs() {
    const inputNames: string[] = []
    let numberOfOpenConnections = 0

    // Loop over each midi input:
    for (const input of Array.from(this.access.inputs.values())) {

      // Attach a midi message listener to every input.
      input.onmidimessage = message => this.handleMidiMessage(message)

      // Collect the name of each input.
      inputNames.push(input.name)

      // Add up the number of connected inputs.
      if (input.state === "connected" && input.connection === "open")
        numberOfOpenConnections += 1
    }

    // If the number of connected inputs has changed:
    if (numberOfOpenConnections !== this.numberOfOpenConnections) {

      // Call the input change callback.
      this.onInputChange(inputNames)

      // Update the number of connected inputs.
      this.numberOfOpenConnections = numberOfOpenConnections
    }
  }

  /**
   * Handle a message from a MIDI input.
   */
  private handleMidiMessage(message: MIDIMessageEvent) {
    this.onMessage(message)
  }
}
