import cards from './cards';
import Category from './category';

const gameToggle = () => {
  if (document.querySelector('#modeToggle').checked) {
    Category.elements.playmode = 1;
  } else {
    Category.elements.playmode = 0;
  }
};

const Game = {
  elements: {
    startBtn: null,
    result: null,
  },

  createFields() {
    if (Category.elements.playmode === 1) {
      this.elements.startBtn = document.createElement('div');
      this.elements.result = document.createElement('div');

      this.elements.startBtn.classList.add('btn-start');
      this.elements.result.classList.add('result-counter');

      this.elements.startBtn.innerHTML = '<span class="btn-label">Start play!</span>';

      document.querySelector('.flex-wrapper').appendChild(this.elements.startBtn);
      document.querySelector('.flex-wrapper').insertBefore(this.elements.result, document.querySelector('.flex__item-flipper'));
    }
  },
};

document.querySelector('#modeToggle').addEventListener('click', () => {
  gameToggle();
  if (document.querySelector('.flex__item-flipper')) {
    document.querySelector('.flex-wrapper').remove();
    Category.init();
    Game.createFields();
  }
});

export default Game;
