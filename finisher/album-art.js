import { LitElement, css, html } from 'lit'

// Step 0. Import `LitElement`, `html`, and `css from `lit`
// Step 1. Extend the LitElement base class
// Step 2. Add the `render` function to return the markup
// Step 3. Import the styles into the file
// Step 4. Add `static properties` to define the properties
// Step 5. Use the properties in the markup within the `render` function


// Tip, use the `attribute` option for the property to change the attribute to use camel case, e.g., `imgSrc` to `img-src`.
// This ensures we don't break backwards compatibility with the vanilla web component.

class AlbumArt extends LitElement {
  static properties = {
    imgSrc: { type: String, attribute: 'img-src' },
    alt: { type: String },
    artistName: { type: String, attribute: 'artist-name' },
    albumName: { type: String, attribute: 'album-name' }
  }

  render() {
    return html`
    <style>
      @import url('./reset.css');
      @import url('./styles.css');
    </style>

    <div>
      <img class="square-aspect-ratio" src="${this.imgSrc}" alt="${this.alt}" />
      <h3>${this.artistName}</h3>
      <p>${this.albumName}</p>
    </div>
    `
  }
}

customElements.define('album-art', AlbumArt);