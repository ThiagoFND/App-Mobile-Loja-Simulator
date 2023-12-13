const express = require('express');
const productController = require('../controllers/productController');
const productRouter = express.Router();

// Alteração na rota para listar todos os produtos
productRouter.route('/api/products')
    .get((req, res) => productController.search(req, res));

productRouter.route('/api/product/create')
    .post((req, res) => productController.create(req, res));
    
productRouter.route('/api/product/:code')
    .get((req, res) => productController.searchOne(req, res));

productRouter.route('/api/product/avatar')
    .post((req, res) => productController.changeAvatar(req, res));

productRouter.route('/api/cart/update')
    .put((req, res) => productController.updateCart(req, res));

module.exports = productRouter;
