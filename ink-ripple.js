/**
 * # Styling
 * 
 * `<ink-ripple>` provides the following custom properties and mixins
 * for styling:
 * 
 * 
 * Custom property | Description | Default
 * ----------------|-------------|----------
 * `--ink-ripple-accent-color` | black
 * `--ink-ripple-opacity` | Opacity of the ripple | 0.15
 * 
 */
class InkRipple extends HTMLElement {

  constructor() {
    super();

    this.attachShadow({
      mode: 'open'
    });
    this.shadowRoot.appendChild(InkRipple.template.cloneNode(true));

    this.cssAdded = false;

    let root = this.shadowRoot;

    this.styles = root.querySelector('style');
  }

  static get template() {
    if(this.fragment) return this.fragment;

    const fragment = document.createDocumentFragment();
    let styles = document.createElement('style');
    styles.innerHTML = `
      :host {
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        overflow: hidden;

        --ink-ripple-accent-color: black;
        --ink-ripple-opacity: 0.15;
      }
      :host::before {
        position: absolute;
        display: block;
        content: '';

        border-radius: 50%;
        background: var(--ink-ripple-accent-color);
        opacity: 0;
        transform: scale(0);
        
      }

      :host([animatable])::before {
        transition: opacity .1s linear, transform .3s linear;
      }

      :host([mouseup][animatable])::before {
        transition: opacity .4s linear, transform .2s linear;
      }

      :host([mousedown])::before {
        opacity: var(--ink-ripple-opacity);
        transform: scale(1);
      }

      :host([mouseup]:not([mousedown]))::before {
        opacity: 0;
        transform: scale(1);
      }
    `;

    fragment.appendChild(styles);

    this.fragment = fragment;

    return fragment;
  }

  set animatable(val) {
    if (val) {
      this.setAttribute('animatable', '');
    } else {
      this.removeAttribute('animatable');
    }
  }

  set mousedown(val) {
    if (val) {
      this.setAttribute('mousedown', '');
    } else {
      this.removeAttribute('mousedown');
    }
  }

  set mouseup(val) {
    if (val) {
      this.setAttribute('mouseup', '');
    } else {
      this.removeAttribute('mouseup');
    }
  }

  set disabled(val) {
    if (val) {
      this.setAttribute('disabled', '');
    } else {
      this.removeAttribute('disabled');
    }
  }

  get mouseup() {
    return this.hasAttribute('mouseup');
  }

  get mousedown() {
    return this.hasAttribute('mousedown');
  }

  get disabled() {
    return this.hasAttribute('disabled');
  }

  connectedCallback() {
    // event listeners
    this.addEventListener('mousedown', (e) => {
      if (this.disabled) {
        return;
      }
      this._triggerRippleIn(e.offsetX, e.offsetY);
    });

    document.documentElement.addEventListener('mouseup', e => {
      if (this.disabled) {
        return;
      }
      this._triggerRippleOut();
    });
  }

  /**
   * Simulates a ripple effect at the given parameter coordinates.
   * 
   * If missing one or both parameters, ripple originates from center
   * 
   * @param {number} x The X coordinate of the ripple origin
   * @param {number} y The Y coordinate of the ripple origin
   */
  simulateRipple(x = false, y = false) {

    if (!x || !y) {
      const rect = this.getBoundingClientRect();
      x = rect.width / 2;
      y = rect.height / 2;
    }

    this._triggerRippleIn(x, y);

    this.addEventListener('transitionend', (e) => {
      if (e.propertyName === 'transform' ) {
        this._triggerRippleOut();
      }
    });

  }

  _fadeOut() {
      this.mousedown = false;

      // not strictly needed, just cleans up the element
      requestAnimationFrame(() => {
        this.addEventListener('transitionend', this._transitionOutEnd);
      });
  }

  _removeCSS() {
    this.styles.sheet.deleteRule(0);
    this.cssAdded = false;
  }

  _reset() {
    this.animatable = false;
    this.mousedown = false;
    this.mouseup = false;

    this.removeEventListener('transitionend', this._transitionOutEnd);
    this.removeEventListener('transitionend', this._transitionInEnd);

    if (this.cssAdded) {
      this._removeCSS();
    }

    this.transitionInOver = false;
    this.transitionOutOver = false;
  }

  _transitionInEnd(evt) {
    if (evt.pseudoElement) {
     if (evt.propertyName === 'transform' && !this.transitionInOver) {

        this.removeEventListener('transitionend', this._transitionInEnd);

        this.transitionInOver = true;

        if (this.mouseup) {
          this._fadeOut();
        }
     }
    }
  }

  _transitionOutEnd(evt) {
    if (evt.pseudoElement) {
      if (evt.propertyName === 'opacity' ) {

        this.transitionOutOver = true;
        
        this._reset();
      }
    }
  }

  _positionPseduoElement(x, y) {
    var rect = this.getBoundingClientRect();
    var height = rect.height;
    var width = rect.width;

    var largest = Math.max(height, width);

    width = largest * 2 + (largest / 2);
    height = largest * 2 + (largest / 2);

    var xPos = x - (width / 2);
    var yPos = y - (height / 2);

    var selector = ':host:before';
    var rule = 'left: ' + xPos + 'px; top: ' + yPos + 'px; width: ' + width + 'px; height: ' + height + 'px;';
    
    // document.styleSheets[0].addRule(selector, rule);
    this.styles.sheet.insertRule(selector + ' { ' + rule + ' } ', 0);

    this.cssAdded = true;
  }

  _triggerRippleIn(offsetX, offsetY) {

    this._reset();

    this._positionPseduoElement(offsetX, offsetY);

    requestAnimationFrame(() => {
      this.addEventListener('transitionend', this._transitionInEnd);
      this.animatable = true;
      this.mousedown = true;
    });
  }

  _triggerRippleOut() {
    if (this.transitionOutOver || !this.mousedown) {
      return;
    }

    this.mouseup = true;

    if (this.transitionInOver) {
      this._fadeOut();
    }
  }

}

customElements.define('ink-ripple', InkRipple);