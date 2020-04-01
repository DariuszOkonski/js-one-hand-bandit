class Wallet {
  constructor(startAmount) {
    this.amount = startAmount;
  }

  getAmount() {
    return this.amount;
  }

  addToAmount(value) {
    this.amount += value;
  }

  removeFromAmount(value) {
    this.amount -= value;
  }

  checkWallet(amount) {
    return (this.amount >= amount);
  }
}

export default Wallet;