import cards from './cards';

const Home = {
  elements: {
    wrapper: null,
    categories: null,
  },

  init() {
    this.elements.wrapper = document.createElement('div');

    this.elements.wrapper.classList.add('grid-wrapper');
    this.elements.wrapper.appendChild(this.createCategories());

    document.querySelector('body').appendChild(this.elements.wrapper);
  },

  createCategories() {
    const fragment = document.createDocumentFragment();
    cards[0].forEach((e) => {
      const gridItem = document.createElement('div');
      const lable = document.createElement('span');
      lable.classList.add('category-label');
      gridItem.classList.add('grid__item');
      gridItem.innerHTML = this.findImg(e);
      lable.innerText = e.category;
      gridItem.appendChild(lable);
      fragment.appendChild(gridItem);
    });
    return fragment;
  },

  findImg(e) {
    const path = e.image;
    const image = `<img class="grid__img" src="../src/${path}">`;
    return image;
  },
};

window.addEventListener('DOMContentLoaded', () => {
  Home.init();
});
