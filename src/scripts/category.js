import cards from './cards';

const Category = {
  elements: {
    wrapper: null,
    catnumber: null,
  },

  init() {
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.classList.add('flex-wrapper');
    this.elements.wrapper.appendChild(this.createCards(this.elements.catnumber));

    document.querySelector('body').appendChild(this.elements.wrapper);
  },

  createCards() {
    const fragment = document.createDocumentFragment();
    cards[this.elements.catnumber].forEach((e) => {
      const flexItem = document.createElement('div');
      const lable = document.createElement('span');
      lable.classList.add('category-label');
      flexItem.classList.add('flex__item');
      flexItem.innerHTML = this.findImg(e);
      lable.innerText = e.word;
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
};

export default Category;
