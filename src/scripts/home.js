import cards from './cards';
import Category from './category';
import Game from './gamemode';

const Home = {
  elements: {
    wrapper: null,
  },

  init() {
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.classList.add('flex-wrapper');
    this.elements.wrapper.appendChild(this.createCategories());
    document.querySelector('body').appendChild(this.elements.wrapper);
  },

  createCategories() {
    const fragment = document.createDocumentFragment();
    cards[0].forEach((e, i) => {
      const flexItem = document.createElement('div');
      flexItem.setAttribute('catnumber', `${i + 1}`);
      flexItem.addEventListener('click', (event) => {
        this.setCatNubmer(event, 'div');
        document.querySelector('.flex-wrapper').remove();
        Category.init();
        Game.createFields();
        document.querySelector('.header-menu').classList.remove('menu__item_active');
        document.querySelector('.menu-wrapper').classList.remove('menu-wrapper_active');
      });
      const lable = document.createElement('span');
      lable.classList.add('category-label');
      flexItem.classList.add('flex__item');
      flexItem.innerHTML = this.findImg(e);
      lable.innerText = e.category;
      flexItem.appendChild(lable);
      fragment.appendChild(flexItem);
    });
    return fragment;
  },

  findImg(e) {
    const path = e.image;
    const image = `<img class="flex__img" src="../src/${path}">`;
    return image;
  },

  setCatNubmer(event, node) {
    Category.elements.catnumber = event.target.closest(node).getAttribute('catnumber');
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Home.init();
});


export default Home;
