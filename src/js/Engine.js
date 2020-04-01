import Colors from './Colors';
import Wallet from './Wallet';

const START_AMOUNT = 200;

class Engine {
  constructor() {
    this.colors = new Colors();
    this.wallet = new Wallet(START_AMOUNT)
    this.bid = 0;

    this.cardColors = document.querySelectorAll('.card-deck .card');
    this.btnRoll = document.getElementById('btn-roll').addEventListener('click', (e) => this.rollEngine(e));
    this.btnReset = document.getElementById('btn-reset').addEventListener('click', (e) => this.reset(e));
    this.moneyInput = document.getElementById('money-input');


    this.render();
  }

  render() {
    this.renderCardColors();
    this.renderWallet();
  }

  renderCardColors() {
    this.cardColors.forEach((card, i) => {
      card.style.backgroundColor = this.colors.colors[i].getColor();
    })
  }

  renderWallet() {
    document.getElementById('wallet').textContent = this.wallet.getAmount();
  }
  ///======================================
  rollEngine(e) {
    this.bid = this.getMoney(e);
    console.log(this.bid)
    if (this.bid === undefined)
      return;

    this.wallet.removeFromAmount(this.bid);


    this.render();
  }

  reset(e) {
    this.colors = new Colors();
    this.wallet = new Wallet(START_AMOUNT);
    this.bid = 0;

    this.render();
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