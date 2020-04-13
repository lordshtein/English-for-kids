import cards from './cards';

const Menu = {
  elements: {
    wrapper: null,
    menuList: null,
  },

  init() {
    this.elements.wrapper = document.createElement('div');
    this.elements.menuList = document.createElement('ul');

    this.elements.wrapper.classList.add('menu-wrapper');
    this.elements.menuList.classList.add('menu-list');
    this.elements.menuList.appendChild(this.createMenu());

    this.elements.wrapper.appendChild(this.elements.menuList);
    document.querySelector('.header').appendChild(this.elements.wrapper);
  },

  createMenu() {
    const fragment = document.createDocumentFragment();
    cards[0].forEach((e) => {
      const menuItem = document.createElement('li');
      menuItem.classList.add('menu__item');
      menuItem.innerText = e;
      fragment.appendChild(menuItem);
    });
    return fragment;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Menu.init();
});

const menuClick = () => {
  document.querySelector('.header-menu').classList.toggle('menu__item_active');
  document.querySelector('.menu-wrapper').classList.toggle('menu-wrapper_active');
};

document.querySelector('.header-menu').addEventListener('click', menuClick);
