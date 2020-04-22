import cards from './cards';
import Home from './home';
import Category from './category';
import Game from './gamemode';


const menuClick = () => {
  document.querySelector('.header-menu').classList.toggle('header__menu_active');
  document.querySelector('.menu-wrapper').classList.toggle('menu-wrapper_active');
};

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
    document.querySelector('.home').addEventListener('click', () => {
      document.querySelector('.flex-wrapper').remove();
      Home.init();
      menuClick();
    });
  },

  createMenu() {
    const fragment = document.createDocumentFragment();
    const homePage = document.createElement('li');
    homePage.innerText = 'Home Page';
    homePage.classList.add('menu__item', 'home');

    fragment.appendChild(homePage);
    cards[0].forEach((e, i) => {
      const menuItem = document.createElement('li');
      menuItem.classList.add('menu__item');
      menuItem.setAttribute('catnumber', `${i + 1}`);
      menuItem.addEventListener('click', (event) => {
        Home.setCatNubmer(event, 'li');
        document.querySelector('.flex-wrapper').remove();
        Category.init();
        Game.createFields();
        Game.gameAudio = [];
        menuClick();
      });
      menuItem.innerText = e.category;
      fragment.appendChild(menuItem);
    });
    return fragment;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Menu.init();
});


document.querySelector('.header-menu').addEventListener('click', menuClick);
