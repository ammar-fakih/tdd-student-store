const {storage} = require('../data/storage');

class Storage {

  static getProducts() {
    return storage.get('products');
  }

  static getProductById(id) {
    return storage.get("products").find({id: Number(id)})
  }
}

module.exports = Storage