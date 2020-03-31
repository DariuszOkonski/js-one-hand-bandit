import Colors from './Colors';

class Engine {
  constructor() {
    this.colors = new Colors();
    this.cardColors = document.querySelectorAll('.card-deck .card');
    this.btnRoll = document.getElementById('btn-roll').addEventListener('click', (e) => this.rollEngine(e));

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

    console.log(this.colors.colors[0], this.colors.colors[1], this.colors.colors[2])

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