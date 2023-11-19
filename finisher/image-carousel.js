import { LitElement, css, html } from 'lit'

class ImageCarousel extends LitElement {
  static styles = css`
  .wrapper {
    max-width: 500px;
    margin-inline: auto;
  }

  .carousel {
    width: min(100%, 500px);
    overflow-x: hidden;
  }

  .image-wrapper {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    pointer-events: none;
  }

  ::slotted(*) {
    scroll-snap-align: start;
    flex-shrink: 0;
    width: min(100%, 500px);
  }
  `

  static properties = {
    currentPosition: { type: Number, name: 'current-position' },
  }

  #handleScroll = () => {
    const currentPosition = this.currentPosition;

    if (currentPosition === 5) {
      this.images.scrollBy({
        left: -10000,
        behavior: 'instant'
      })
      this.currentPosition = 0

      return;
    }

    this.images.scrollBy({
      left: 200,
      behavior: 'instant'
    })
    this.currentPosition = currentPosition + 1
  }

  firstUpdated() {
    this.images = this.shadowRoot.querySelector('.image-wrapper');
    this.currentPosition = 0
  }

  render() {
    return html`
      <style>
        @import url('./reset.css');
        @import url('./styles.css');
      </style>

      <div class="wrapper">
        <div class="carousel">
          <slot class="flex-row image-wrapper" />
        </div>
        <div class="flex-row space-between">
          <p data-testid="counter" class="position">${this.currentPosition}</p>
          <button @click=${this.#handleScroll}>Next</button>
        </div>
      </div>
    `
  }
}

customElements.define('image-carousel', ImageCarousel);
