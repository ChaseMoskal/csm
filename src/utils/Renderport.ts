
export interface RenderportOptions {

  /** Element which will contain the canvas. */
  host: HTMLElement
}

/**
 * Canvas stage, for rendering.
 */
export default class Renderport {
  private readonly canvas: HTMLCanvasElement = document.createElement("canvas")
  private readonly unitDefinition: number
  private readonly recalculationTimer: number
  private lastWidth: number
  private lastHeight: number
  private aspectRatio: number

  // Conversions.
  private readonly percentToPixelsX = p => (p/100) * this.canvas.width
  private readonly percentToPixelsY = p => (p/100) * this.canvas.height

  /**
   * Recalculate the resolution of the canvas.
   */
  private recalculateResolution = () => {
    const width = this.canvas.clientWidth
    const height = this.canvas.clientHeight
    const changed = (width !== this.lastWidth) || (height !== this.lastHeight)

    if (changed) {
      this.canvas.width = width
      this.canvas.height = height
      this.aspectRatio = width / height
    }

    this.lastWidth = width
    this.lastHeight = height
  }

  /**
   * Create a Renderport.
   */
  constructor(options: RenderportOptions) {
    this.canvas.width = 480
    this.canvas.height = 240
    options.host.appendChild(this.canvas)

    // Regularly recalculate resolution.
    this.recalculateResolution()
    this.recalculationTimer = window.setInterval(this.recalculateResolution, 1000)
    window.addEventListener("resize", this.recalculateResolution)
  }

  /**
   * Cleanup after a visualizer.
   */
  destructor() {
    window.removeEventListener("resize", this.recalculateResolution)
    window.clearInterval(this.recalculationTimer)
  }
}
