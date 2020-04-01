import Colors from './Colors';

class Engine {
  constructor() {
    this.colors = new Colors();
    this.cardColors = document.querySelectorAll('.card-deck .card');
    this.btnRoll = document.getElementById('btn-roll').addEventListener('click', (e) => this.rollEngine(e));
    this.btnReset = document.getElementById('btn-reset').addEventListener('click', (e) => this.reset(e));

    this.render();
  }

  render() {
    this.renderCardColors();
  }

  renderCardColors() {
    this.cardColors.forEach((card, i) => {
      card.style.backgroundColor = this.colors.colors[i].getColor();
    })
  }

  ///======================================
  rollEngine(e) {
    this.setRandomColors();

    this.render();
  }

  reset(e) {
    this.colors = new Colors();

    this.render();
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