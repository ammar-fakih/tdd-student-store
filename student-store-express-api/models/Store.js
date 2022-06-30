const {storage} = require('../data/storage');
const {BadRequestError} = require('../utils/errors');

class Storage {

  static getProducts() {
    return storage.get('products');
  }

  static getPurchases() {
    return storage.get('purchases');
  }

  static getProductById(id) {

    const productInfo = storage.get("products").find({id: Number(id)}).value()
    if (!productInfo) {
      throw new BadRequestError(`Product with id ${id} not found`);
    }
    return productInfo;
  }

  static getPurchaseById(id) {

    const purchaseInfo = storage.get("purchases").find({id: Number(id)}).value()
    if (!purchaseInfo) {
      throw new BadRequestError(`Purchase with id ${id} not found`);
    }
    return purchaseInfo;
  }

  static round = (num) => {
    return Number(Math.round(num + 'e2') + 'e-2');
  };

  static createReceipt(checkoutForm) {
    let lines = [`Showing receipt for ${checkoutForm.user.name} available at ${checkoutForm.user.email}:`];
    let totalPrice = 0;

    let addedIds = new Set();
    const productRows = checkoutForm.shoppingCart.map(item => {
      if (!item.itemId) {
        throw new BadRequestError('Missing productId');
      }

      if (!item.quantity) {
        throw new BadRequestError('Missing quantity');
      }
      // Check for duplicates in the shopping cart
      if (addedIds.has(item.itemId)) {
        throw new BadRequestError("Duplicate product in cart");
      } else {
        addedIds.add(item.itemId);
      }

      const productInfo = this.getProductById(item.itemId);
      const itemTotalCost = this.round(productInfo.price * item.quantity);
      totalPrice += itemTotalCost;
      lines.push(`${item.quantity} total ${productInfo.name} purchased at a cost of $${productInfo.price} for a total cost of $${itemTotalCost}`);
      return { ...productInfo, quantity: item.quantity, totalPrice: itemTotalCost};
    })

    totalPrice = this.round(totalPrice);

    lines.push(`Before taxes, the subtotal was $${totalPrice}.`);
    lines.push(`After taxes and fees were applied, the total comes out to $${this.round(totalPrice * 1.0875)}.`);

    return {receipt: { userInfo: { name: checkoutForm.user.name, email: checkoutForm.user.email }, lines, productRows }, totalPrice};
  }

  static checkOut(checkoutForm) {
    try {
      if (!checkoutForm.user || !checkoutForm.user.name || !checkoutForm.user.email) {
        throw new BadRequestError('Missing user information');
      }
      if (!checkoutForm.shoppingCart || checkoutForm.shoppingCart.length === 0) {
        throw new BadRequestError('Missing shopping cart');
      }
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
    } catch(e) {
      throw new BadRequestError(e.message);
    }
    
  }
}

module.exports = Storage