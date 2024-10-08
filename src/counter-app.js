import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";

export class CounterApp extends DDDSuper(LitElement) {
  static get tag() {
    return "counter-app";
  }

  constructor() {
    super();
    this.count = 0;
    this.min = 0;
    this.max = 100;
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
        
        .wrapper{
          padding: var(--ddd-spacing-4);
          margin: var(--ddd-spacing-0);
        }

        .counter {
          font-size: 65.6px; 
          margin: var(--ddd-spacing-5) var(--ddd-spacing-0);
        }

        button {
          padding: var(--ddd-spacing-2) var(--ddd-spacing-5);
          font-size: 20px;
          cursor: pointer;
          border: none;
          border-radius: var(--ddd-radius-sm);
          background-color: var(--ddd-theme-default-link);
          color: var(--ddd-theme-default-white);
          margin: var(--ddd-spacing-0) var(--ddd-spacing-1);
          transition: background-color 0.3s, transform 0.2s;
        }

        button:hover {
          background-color: var(--ddd-theme-default-link80);
          transform: scale(1.05);
        }

        button:disabled {
          cursor: not-allowed;
          background-color: var(--ddd-theme-default-limestoneGray);
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
    if (changedProperties.has('count') && this.count === this.max) {
      
      this.makeItRain();
    }
  }

  getColor() {
    if (this.count === this.max || this.count === this.min) {
      return 'var(--ddd-theme-default-original87Pink)'; // Max and mix
    }

    else if(this.count === 21 || this.count === 18){
      return 'var(--ddd-theme-default-keystoneYellow)' //Random middle ground
    }

    return 'var(--ddd-theme-default-opportunityGreen)'; // Default
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
      <confetti-container id="confetti" class="wrapper">
        <div class="counter" style="color: ${this.getColor()}">${this.count}</div>
        <div>
          <button @click="${this.increment}" ?disabled="${this.count === this.max}" title="Increment by one">+</button>
          <button @click="${this.decrement}" ?disabled="${this.count === this.min}" title="Decrement by one">-</button>
        </div>
      </confetti-container>
    `;
  }

  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url).href;
  }
}

globalThis.customElements.define(CounterApp.tag, CounterApp);