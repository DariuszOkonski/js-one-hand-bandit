import Colors from './Colors';
import Wallet from './Wallet';
import Statistics from './Statistics';

const START_AMOUNT = 200;

class Engine {
  constructor() {
    this.colors = new Colors();
    this.wallet = new Wallet(START_AMOUNT);
    this.statistics = new Statistics();
    this.bid = 0;

    this.btnRoll = document.getElementById('btn-roll').addEventListener('click', (e) => this.rollEngine(e));
    this.btnReset = document.getElementById('btn-reset').addEventListener('click', (e) => this.reset(e));

    this.moneyInput = document.getElementById('money-input');
    this.cardColors = document.querySelectorAll('.card-deck .card');
    this.walletDiv = document.getElementById('wallet');
    this.currentScoreSpan = document.getElementById('current-score');
    this.gamesSpan = document.getElementById('games');
    this.wonGamesSpan = document.getElementById('won-games');
    this.lostGamesSpan = document.getElementById('lost-games');

    this.render();
  }

  // render methods
  render() {
    this.renderCardColors();
    this.renderWallet();
    this.renderStatistics();
  }

  renderCardColors() {
    this.cardColors.forEach((card, i) => {
      card.style.backgroundColor = this.colors.colors[i].getColor();
    })
  }

  renderWallet() {
    this.walletDiv.textContent = this.wallet.getAmount();
  }

  renderStatistics() {
    this.currentScoreSpan.textContent = this.statistics.currentScore;
    this.gamesSpan.textContent = this.statistics.games;
    this.wonGamesSpan.textContent = this.statistics.wonGames;
    this.lostGamesSpan.textContent = this.statistics.lostGames;
  }
  ///click event methods
  rollEngine(e) {
    this.bid = this.getMoney(e);
    if (this.bid === undefined)
      return;

    this.wallet.removeFromAmount(this.bid);

    this.checkCurrentPlay(this.colors.getColorsTable(), this.bid)

    this.render();
  }

  reset(e) {
    this.colors = new Colors();
    this.wallet = new Wallet(START_AMOUNT);
    this.statistics = new Statistics();
    this.bid = 0;

    this.render();
  }

  // additional methods
  checkCurrentPlay(drawArray, amount) {
    let reward = 0;
    let wins = 0;
    let losses = 0;


    if (drawArray[0] === 'red' && drawArray[1] === 'red' && drawArray[2] === 'red') {
      reward = 1.5;
      wins++;
    } else if (drawArray[0] === 'green' && drawArray[1] === 'green' && drawArray[2] === 'green') {
      reward = 2;
      wins++;
    } else if (drawArray[0] === 'blue' && drawArray[1] === 'blue' && drawArray[2] === 'blue') {
      reward = 2.5
      wins++;
    } else if (drawArray[0] !== drawArray[1] && drawArray[1] !== drawArray[2] && drawArray[2] !== drawArray[0]) {
      reward = 3;
      wins++;
    } else {
      reward = 0;
      losses = 1;
    }


    console.log(reward, wins, losses);
    console.log('=====================')

    //TODO
  }

  getMoney(e) {
    let amount = Number(this.moneyInput.value);

    if (amount < 0 || amount > this.wallet.getAmount()) {
      amount = 0;
    }

    if (amount === 0) {
      alert('You have to bet first');
      this.moneyInput.value = 0;
      return
    }

    this.setRandomColors();
    this.moneyInput.value = 0;
    return Math.floor(amount);
  }

  setRandomColors() {
    const colors = ['red', 'green', 'blue'];
    const randomColors = [];

    for (let i = 0; i < colors.length; i++) {
      randomColors.push(colors[Math.floor(Math.random() * colors.length)]);
    }

    this.colors.changeColors(randomColors);
  }
}



export default Engine;