import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class CounterApp extends DDDSuper(LitElement) {
  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 10;
    this.min = 10;
    this.max = 25;
  }

  static get properties() {
    return {
      count: { type: Number },
      min: { type: Number },
      max: { type: Number }
    };
  }

  static get styles() {
    return [
      super.styles,
      css`
        :root, :host  {
          display: block;
          color: var(--ddd-theme-primary);
          background-color: var(--ddd-theme-accent);
          font-family: var(--ddd-font-navigation);
          font-size: var(--counter-app-font-size, var(--ddd-font-size-s));
        }

        .wrapper {
          margin: var(--ddd-spacing-2);
          padding: var(--ddd-spacing-4);
        }

        .counter {
          font-size: 65.6px; 
          margin: 20px 0;
        }

        button {
          padding: 10px 20px;
          font-size: 20px;
          cursor: pointer;
          border: none;
          border-radius: 5px;
          background-color: #007BFF;
          color: white;
          margin: 0 4px;
          transition: background-color 0.3s, transform 0.2s;
        }

        button:hover {
          background-color: #0056b3;
          transform: scale(1.05);
        }

        button:disabled {
          background-color: #cccccc;
        }
      `,
    ];
  }

  increment() {
    if (this.count < this.max) {
      this.count++;
    }
  }

  decrement() {
    if (this.count > this.min) {
      this.count--;
    }
  }

  updated(changedProperties) {
    if (changedProperties.has('count')) {
      this.makeItRain();
    }
  }

  getColor() {
    if (this.count === this.max) {
      return 'red'; // Max
    }
    return 'black'; // Default
  }

  makeItRain() {
    import("@haxtheweb/multiple-choice/lib/confetti-container.js").then(() => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    });
  }

  render() {
    return html`
      <div class="counter" style="color: ${this.getColor()}">${this.count}</div>
      <button @click="${this.increment}" ?disabled="${this.count >= this.max}">+</button>
      <button @click="${this.decrement}" ?disabled="${this.count <= this.min}">-</button>
      <confetti-container id="confetti"></confetti-container>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);