import Color from './Color';

class Colors {
  constructor() {
    this.colors = this.setColors();
  }

  setColors() {
    const colors = [];
    for (let i = 0; i < 3; i++) {
      colors.push(new Color('grey'));
    }
    return colors;
  }

  changeColors(arr) {
    for (let i = 0; i < arr.length; i++) {
      this.colors[i].changeColor(arr[i]);
    }
  }
}

export default Colors;