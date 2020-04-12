import cards from './cards';

const Menu = {
  elements: {
    wrapper: null,
    menuLayout: null,
  },

  init() {
    this.elements.wrapper = document.createElement('div');
    this.elements.menuLayout = document.createElement('ul');

    this.elements.wrapper.classList.add('menu-layout');
    this.elements.keyboardLayout.appendChild(this.createLayout());

    document.body.appendChild(this.elements.textarea);
    document.body.appendChild(this.elements.description);
    this.elements.wrapper.appendChild(this.elements.menuLayout);
    document.body.appendChild(this.elements.wrapper);

  },
};

window.addEventListener('DOMContentLoaded', () => {
  Menu.init();
});
