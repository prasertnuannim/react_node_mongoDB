const express = require("express");
const { list, read, update, remove, create } = require("../controller/product");
const router = express.Router();

router.post("/product", create)
router.get("/product", list)
router.get("/product/:id", read)
router.put("/product/:id", update)
router.delete("/product/:id", remove)

module.exports = router
