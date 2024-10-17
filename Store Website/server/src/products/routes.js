const { Router } = require('express');
const controller = require('./controller');

const router = Router();

router.get('/categories', controller.getCategories);
router.get('/subcategories/:id', controller.getSubCategory);
router.get('/products/:id', controller.getProducts)
router.get('/products', controller.getAllProducts)

module.exports = router;