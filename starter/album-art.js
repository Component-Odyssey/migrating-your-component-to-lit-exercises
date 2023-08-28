// Step 0. Import `LitElement`, `html`, and `css from `lit`
// Step 1. Extend the LitElement base class
// Step 2. Add the `render` function to return the markup
// Step 3. Add `static styles` to apply the styles
// Step 4. Add `static properties` to define the properties
// Step 5. Use the properties in the markup within the `render` function

// Tip: use the `attribute` option for the property to change the attribute to use camel case, e.g., `imgSrc` to `img-src`.
// This ensures we don't break backwards compatibility with the vanilla web component.

/* 
  Note: While we're doing it for this lesson, it's a bad practice add a <link rel="stylesheet" /> in the html function
*/

const template = document.createElement('template');

template.innerHTML = `
<style>
  @import url('./reset.css');
  @import url('./styles.css');
</style>
<div>
  <img class="square-aspect-ratio" src="" alt="" />
  <h3></h3>
  <p></p>
</div>
`

class AlbumArt extends HTMLElement {
  constructor() {
    super();

    const shadowRoot = this.attachShadow({ mode: 'open' });
    const templateContent = template.content;

    this.shadowRoot.appendChild(templateContent.cloneNode(true));
  }

  connectedCallback() {
    const img = this.shadowRoot.querySelector('img');
    const artistName = this.shadowRoot.querySelector('h3');
    const albumName = this.shadowRoot.querySelector('p');

    img.src = this.getAttribute('img-src');
    img.alt = this.getAttribute('alt');
    artistName.textContent = this.getAttribute('artist-name');
    albumName.textContent = this.getAttribute('album-name');
  }
}

customElements.define('album-art', AlbumArt);