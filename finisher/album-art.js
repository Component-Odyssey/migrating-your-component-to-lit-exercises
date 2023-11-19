import { LitElement, css, html } from 'lit'

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