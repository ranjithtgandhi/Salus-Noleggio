import { html, css, LitElement } from 'lit';

export class Accordion extends LitElement {
    static get styles() {
        return css `
      .accordion {
        color: var(--ion-color-secondary);
        font-size: 13px;
        font-family: 'Spartan-semibold';
        border: 1px solid rgb(171 174 188 / 50%);
        border-radius: 4px;
        padding: 12px;
        margin-bottom:15px;
      }
      .accordion-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        position: relative;
        cursor: pointer;
        color: var(--ion-color-secondary);
           font-size: 13px;
           padding: 6px 5px 6px 5px;
           font-family: 'Spartan-semibold';
      }
      .accordion-title:after {
        content: '';
        height: 8px;
        width: 8px;
        border-right: 2px solid #23303d;
        border-top: 2px solid #23303d;
        transform: rotate(135deg);
        position: absolute;
        right: 10px;
        transition: all 0.3s ease;
      }
      .accordion-title:after {
        transform: rotate(45deg);
      }
      .accordion.active .accordion-title:after {
        transform: rotate(135deg);
      }
      .accordion .accordion-content {
        font-weight: 300;
        line-height: 1.71;
        letter-spacing: normal;
        max-height: 0;
        transition: all 0.3s ease;
        overflow: hidden;
      }
      .accordion.active .accordion-content {
        max-height: 300px;
      }
    `;
    }

    static get properties() {
        return {
            title: { type: String },
        };
    }

    constructor() {
        super();
        this.title = 'Soru?';
        this.show = false;
    }

    render() {
        return html `
      <div class="accordion ion-border">
        <div class="accordion-title plywood-invoice ion-border-bottom" @click="${this.toggle}">${this.title}</div>
        <div class="accordion-content"><slot /></div>
      </div>
    `;
    }

    toggle(e) {
        this.show = !this.show;
        const content = this.shadowRoot.querySelector('.accordion');
        if (this.show) {
            content.classList.add('active');
        } else {
            content.classList.remove('active');
        }
        this.dispatchEvent(new CustomEvent('show', { detail: this.show }));
    }
}

customElements.define('accordion-component', Accordion);