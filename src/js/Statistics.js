class Statistics {
  constructor() {
    this.currentScore = '';
    this.games = 0;
    this.wonGames = 0;
    this.lostGames = 0;
  }

  addCurrentScore(value) {
    this.currentScore = value;
  }

  addGames() {
    this.games++;
  }

  addWonGames() {
    this.wonGames++;
  }

  addLostGames() {
    this.lostGames++;
  }
}

export default Statistics;