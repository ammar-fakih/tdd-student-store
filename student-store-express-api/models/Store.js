const {storage} = require('../data/storage');

class Storage {

  static getProducts() {
    return storage.get('products');
  }

  static getProductById(id) {
    return storage.get("products").find({id: Number(id)}).value()
  }

  static createReceipt(checkoutForm) {
    let lines = [`Showing receipt for ${checkoutForm.user.name} available at ${checkoutForm.user.email}:`];
    let totalPrice = 0;
    const productRows = checkoutForm.shoppingCart.map(item => {
      const productInfo = this.getProductById(item.itemId);

      const itemTotalCost = productInfo.price * item.quantity;
      totalPrice += itemTotalCost;
      lines.push(`${item.quantity} total ${productInfo.name} purchased at a cost of $${productInfo.price} for a total cost of $${itemTotalCost}`);
      return { ...productInfo, quantity: item.quantity, totalPrice: itemTotalCost};
    })

    lines.push(`Before taxes, the subtotal was $${totalPrice}.`);
    lines.push(`After taxes and fees were applied, the total comes out to $${totalPrice * 1.0875}.`);

    return {receipt: { userInfo: { name: checkoutForm.user.name, email: checkoutForm.user.email }, lines, productRows }, totalPrice};
  }

  static checkOut(checkoutForm) {
    let currentPurchases = storage.get('purchases');
    const id = currentPurchases.size() + 1;
    console.log(id)
    const {receipt, total} = this.createReceipt(checkoutForm);
    const createdAt = new Date().toISOString()

    const purchase = {
      id,
      name: checkoutForm.user.name,
      email: checkoutForm.user.email,
      order: checkoutForm.shoppingCart,
      total,
      createdAt,
      receipt,
    }
    currentPurchases.push(purchase).write()
    return purchase;
  }
}

module.exports = Storage