const template = document.createElement('template')

template.innerHTML = `
<style>
  @import url('./reset.css');
  @import url('./styles.css');

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
</style>
<div class="wrapper">
  <div class="carousel">
    <slot class="flex-row image-wrapper" />
  </div>
  <div class="flex-row space-between">
    <p data-testid="counter" class="position"></p>
    <button>Next</button>
  </div>
</div>
`

class ImageCarousel extends HTMLElement {
  static get observedAttributes() {
    return ['current-position']
  }

  #getCurrentPosition = () => {
    return Number(this.getAttribute('current-position'))
  }

  #setCurrentPosition = (position) => {
    this.setAttribute('current-position', `${position}`)
  }

  #handleScroll = () => {
    const currentPosition = this.#getCurrentPosition()

    if (currentPosition === 5) {
      this.images.scrollBy({
        left: -10000,
        behavior: 'instant'
      })
      this.#setCurrentPosition(0)

      return;
    }

    this.images.scrollBy({
      left: 200,
      behavior: 'instant'
    })
    this.#setCurrentPosition(currentPosition + 1)
  }

  constructor() {
    super()

    this.attachShadow({ mode: 'open' })

    const contents = template.content
    this.shadowRoot.appendChild(contents.cloneNode(true))
  }

  connectedCallback() {
    this.button = this.shadowRoot.querySelector('button')
    this.button.addEventListener('click', this.#handleScroll)

    this.images = this.shadowRoot.querySelector('.image-wrapper')
    this.positionCounter = this.shadowRoot.querySelector('.position')

    this.#setCurrentPosition(0)
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'current-position') {
      this.positionCounter.innerText = newValue
    }
  }

  disconnectedCallback() {
    this.button.removeEventListener('click', this.#handleScroll)
  }
}

customElements.define('image-carousel', ImageCarousel);
