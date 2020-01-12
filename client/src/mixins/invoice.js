const invoice = {
  get total () {
    return this.lineItems.reduce((total, lineItem) => total + lineItem.total, 0)
  }
}