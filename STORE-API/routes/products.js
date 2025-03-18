const express = require("express");
const router = express.Router();
const {getAllProductsStatic, getAllProducts} = require("../controllers/products.js")

router.get("/", getAllProducts);
router.get("/static", getAllProductsStatic)

module.exports = router