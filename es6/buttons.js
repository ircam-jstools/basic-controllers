const events = require('events');

const containerStyles = {
  width: '440px',
  height: '30px',
  display: 'block',
  padding: '4px',
  margin: '2px',
  backgroundColor: '#efefef',
  border: '1px solid #aaaaaa',
};

const legendStyles = {
  color: '#464646',
  font: 'normal bold 12px arial',
  lineHeight: '22px',
  height: '22px',
  display: 'inline-block',
  width: '140px',
  overflow: 'hidden',
  textAlign: 'right',
  padding: 0,
  paddingRight: '6px'
};

const buttonsContainerStyles = {
  display: 'inline-block',
  width: '290px',
  position: 'relative',
  top: '-9px'
};

const buttonStyles = {
  display: 'inline-block',
  font: 'normal normal 12px arial',
  height: '22px',
  border: 'none',
  backgroundColor: '#464646',
  clickedBackgroundColor: '#686868',
  color: '#ffffff',
  borderRight: '4px solid #efefef',
  boxSizing: 'border-box'
};

class Buttons extends events.EventEmitter {
  constructor(legend, labels) {
    super();

    this.legend = legend;
    this.labels = labels;
  }

  render() {
    let content = `<span class="legend">${this.legend}</span>` +
      `<div class="buttons-container">`;

    content += this.labels.map((label) => {
      return `<button data-label="${label}">${label}</button>`;
    }).join('');

    content += `</button>`;

    this.$el = document.createElement('label');
    this.$el.innerHTML = content;

    this.$legend = this.$el.querySelector('.legend');
    this.$buttonsContainer = this.$el.querySelector('.buttons-container');
    this.$buttons = Array.from(this.$el.querySelectorAll('button'));

    this.bindEvents();
    this.addStyles();

    return this.$el;
  }

  addStyles() {
    for (let attr in containerStyles) {
      this.$el.style[attr] = containerStyles[attr];
    }

    for (let attr in legendStyles) {
      this.$legend.style[attr] = legendStyles[attr];
    }

    for (let attr in buttonsContainerStyles) {
      this.$buttonsContainer.style[attr] = buttonsContainerStyles[attr];
    }

    const buttonWidth = 100 / this.$buttons.length;
    this.$buttons.forEach((button) => {
      button.style.width = buttonWidth + '%';
      for (let attr in buttonStyles) {
        button.style[attr] = buttonStyles[attr];
      }
    });
  }

  bindEvents() {
    this.$buttons.forEach((button) => {
      const label = button.getAttribute('data-label');

      button.addEventListener('mousedown', (e) => {
        e.preventDefault();
        button.style.backgroundColor = buttonStyles.clickedBackgroundColor;
      });

      button.addEventListener('mouseup', (e) => {
        e.preventDefault();
        button.style.backgroundColor = buttonStyles.backgroundColor;
        this.emit('click', label);
      });
    });
  }
}

module.exports = Buttons;
