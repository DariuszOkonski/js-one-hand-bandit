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
    });
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
    if (this.wallet.getAmount() === 0) {
      alert('Your wallet is empty, This is OVER');
      this.moneyInput.value = '0';
      return;
    }

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
    let rate = 0;
    let wins = 0;


    if (drawArray[0] === 'red' && drawArray[1] === 'red' && drawArray[2] === 'red') {
      rate = 1.5;
      wins++;
    } else if (drawArray[0] === 'green' && drawArray[1] === 'green' && drawArray[2] === 'green') {
      rate = 2;
      wins++;
    } else if (drawArray[0] === 'blue' && drawArray[1] === 'blue' && drawArray[2] === 'blue') {
      rate = 2.5
      wins++;
    } else if (drawArray[0] !== drawArray[1] && drawArray[1] !== drawArray[2] && drawArray[2] !== drawArray[0]) {
      rate = 3;
      wins++;
    } else {
      rate = 0;
    }

    this.updateStatistics(amount, rate, wins);

    this.render();
  }

  updateStatistics(amount, rate, wins) {
    let walletValue = 0;
    if (wins > 0) {
      walletValue = Math.round(amount * rate) + amount;
      this.statistics.currentScore = `You won $${walletValue}`;
      this.statistics.wonGames++;
    } else {
      walletValue = 0;
      this.statistics.currentScore = `You lost $${amount}`;
      this.statistics.lostGames++;
    }
    this.statistics.games++;
    this.wallet.addToAmount(walletValue);
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