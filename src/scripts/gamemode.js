import cards from './cards';
import Category from './category';

const gameToggle = () => {
  if (document.querySelector('#modeToggle').checked) {
    Category.elements.playmode = 1;
  } else {
    Category.elements.playmode = 0;
    Game.gameAudio = [];
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
    if (!this.gameAudio || !this.gameAudio.length) {
      this.creatAudios()
    }
    this.elements.startBtn.innerHTML = '<span class="btn-label">Repeat...</span>';
    this.elements.startBtn.classList.add('btn-repeat');

    this.playSound(this.gameAudio[this.gameAudio.length - 1]);
    document.querySelectorAll('.flex__item-flipper').forEach((e) => {
      e.addEventListener('click', (event) => Game.checkAnswer(event));
    });
  },

  playSound(path) {
    const audio = new Audio();
    audio.src = `../src/${path}`;
    audio.autoplay = true;
  },

  creatAudios() {
    if (document.querySelector('.flex__item-flipper')) {
      const { catnumber } = Category.elements;
      this.gameAudio = [];
      cards[catnumber].forEach((e) => {
        this.gameAudio.push(e.audioSrc);
      });
      this.gameAudio.sort(() => Math.random() - 0.5);
    }
  },

  setClicked(e) {
    const target = e.target.closest('.flex__item-flipper')
    target.classList.add('flex_clicked')
    target.removeEventListener('click', (event) => Game.checkAnswer(event));
  },

  createTrue() {
    // add sounds!!!
    const res = document.createElement('div');
    res.classList.add('res__icon-container');
    res.innerHTML = '<img class="game-res game-res_true" src="../src/img/star-win.svg">';
    document.querySelector('.result-counter').prepend(res);
  },

  createFalse() {
    // add sounds!!!
    const res = document.createElement('div');
    res.classList.add('res__icon-container');
    res.innerHTML = '<img class="game-res game-res_false" src="../src/img/star.svg">';
    document.querySelector('.result-counter').prepend(res);
  },

  checkAnswer(e) {
    if (e.target.closest('.flex__item-flipper').classList.contains('flex_clicked')) {
      return
    }
    if (e.target.closest('.flex__item-flipper').getAttribute('dataid') === this.gameAudio[this.gameAudio.length - 1]) {
      this.createTrue();
      this.gameAudio.pop();
      this.setClicked(e)
      if (!this.gameAudio.length) {
        this.finalResult()
        return
      }
      this.playSound(this.gameAudio[this.gameAudio.length - 1]);
    } else {
      this.createFalse();
    }
  },

  finalResult() {
    // add sounds!!!
    const finalRes = document.createElement('div');
    finalRes.classList.add('final-res__container')
    if (document.querySelector('.game-res_false')) {
      finalRes.innerHTML = '<img class="final-res" src="../src/img/failure.jpg">'
    }
    if (!document.querySelector('.game-res_false')) {
      finalRes.innerHTML = '<img class="final-res" src="../src/img/success.jpg">'
    }
    document.querySelector('.flex-wrapper').appendChild(finalRes)
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
