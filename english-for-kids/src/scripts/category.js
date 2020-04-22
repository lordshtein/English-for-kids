import cards from './cards';

const Category = {
  elements: {
    wrapper: null,
    catnumber: null,
    label: null,
    playmode: null,
  },

  init() {
    const { catnumber } = Category.elements;
    this.elements.wrapper = document.createElement('div');
    this.elements.wrapper.classList.add('flex-wrapper');
    this.elements.label = document.createElement('div');
    this.elements.label.classList.add('category-name');
    this.elements.label.innerText = cards[0][catnumber - 1].category;
    this.elements.wrapper.appendChild(this.elements.label);
    this.elements.wrapper.appendChild(this.createCards(this.elements.catnumber));

    document.querySelector('body').appendChild(this.elements.wrapper);
  },

  createCards() {
    const fragment = document.createDocumentFragment();

    cards[this.elements.catnumber].forEach((e) => {
      const flexItem = document.createElement('div');
      const flipper = document.createElement('div');
      const front = document.createElement('div');

      front.classList.add('flex-front');
      flipper.classList.add('flex__flipper');
      flexItem.classList.add('flex__item-flipper');
      flexItem.setAttribute('dataid', `${e.audioSrc}`);

      front.innerHTML = this.findImg(e);

      if (!this.elements.playmode) {
        const back = document.createElement('div');
        const lableRu = document.createElement('span');
        const lableEng = document.createElement('span');
        const rotate = document.createElement('div');

        flexItem.innerHTML = this.findAudio(e);
        flexItem.addEventListener('click', () => this.audioPlay(e.word));

        rotate.classList.add('flip-btn');
        back.classList.add('flex-back');
        lableEng.classList.add('category-label');
        lableRu.classList.add('category-label');

        rotate.addEventListener('click', (event) => { this.rotateCard(event); });
        flexItem.addEventListener('mouseleave', () => {
          if (document.querySelector('.flip')) {
            document.querySelector('.flip').classList.remove('flip');
          }
        });

        rotate.innerHTML = '<i class="fas fa-undo"></i>';
        lableRu.innerText = e.translation;
        back.innerHTML = this.findImg(e);
        lableEng.innerText = e.word;

        back.appendChild(lableRu);
        flipper.appendChild(back);
        front.appendChild(rotate);
        front.appendChild(lableEng);
      }

      flipper.appendChild(front);
      flexItem.appendChild(flipper);
      fragment.appendChild(flexItem);
    });
    return fragment;
  },
  findImg(e) {
    const path = e.image;
    const image = `<img class='flex__img' src='../src/${path}'>`;
    return image;
  },

  findAudio(e) {
    const path = e.audioSrc;
    const audio = `<audio id='${e.word}'> <source src='../src/${path}' type='audio/mp3'></audio>`;
    return audio;
  },

  rotateCard(e) {
    e.target.closest('.flex__flipper').classList.toggle('flip');
  },

  audioPlay(id) {
    document.querySelector(`#${id}`).play();
  },
};

export default Category;
