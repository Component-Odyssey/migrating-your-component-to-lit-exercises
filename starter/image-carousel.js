// Step 0. Import `LitElement`, `html`, and `css from `lit`
// Step 1. Extend the LitElement base class
// Step 2. Add the `render` function to return the markup
// Step 3a. Add the @import styles inside of the render function (bad practice but temporary!)
// Step 3b. Add the rest of the styles to the `static styles` property (good practice!)
// Step 4. Add `static properties` to define the property
// Step 5. Use the properties in the markup within the `render` function
// Step 6. Add the click event listener to the button


// Tip, use the `attribute` option for the property to change the attribute to use camel case, e.g., `imgSrc` to `img-src`.
// This ensures we don't break backwards compatibility with the vanilla web component.
// Bonus: You can remove calls to getAttribute/setAttribute and instead read/write to the property directly

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

  // You won't need to change anything in this function
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
