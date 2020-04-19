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

      this.elements.startBtn.addEventListener('click', () => this.startGame());
      document.querySelector('.flex-wrapper').appendChild(this.elements.startBtn);
      document.querySelector('.flex-wrapper').insertBefore(this.elements.result, document.querySelector('.flex__item-flipper'));
    }
  },

  startGame() {
    this.elements.startBtn.innerHTML = '<span class="btn-label">Repeat...</span>';
    this.elements.startBtn.classList.add('btn-repeat');

    this.playSound(this.gameAudio[this.gameAudio.length - 1]);
  },

  playSound(path) {
    const audio = new Audio();
    audio.src = `../src/${path}`;
    audio.autoplay = true;
  },

  creatAudios() {
    const { catnumber } = Category.elements;
    this.gameAudio = [];
    cards[catnumber].forEach((e) => {
      this.gameAudio.push(e.audioSrc);
    });
    this.gameAudio.sort(() => Math.random() - 0.5);
  },

  createTrue() {
    const right = document.createElement('div');
    right.innerText = 'Ok';
    document.querySelector('.result-counter').appendChild(right);
  },

  createFalse() {

  },

  checkAnswer(e) {
    console.log(e.target);
    if (e.target.closest('.flex__item-flipper').getAttribute('dataid') === this.gameAudio[this.gameAudio.length - 1]) {
      this.createTrue();
      this.gameAudio.pop();
      this.playSound(this.gameAudio[this.gameAudio.length - 1]);
    } else {
      this.createFalse();
    }
    console.log('im working');
  },
};

document.querySelector('#modeToggle').addEventListener('click', () => {
  gameToggle();
  Game.creatAudios();
  if (document.querySelector('.flex__item-flipper')) {
    document.querySelector('.flex-wrapper').remove();
    Category.init();
    Game.createFields();
  }
});

document.addEventListener('click', (e) => Game.checkAnswer(e));

export default Game;
