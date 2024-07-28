const express = require("express");
const router = express.Router();


router.get("/", (req, res) => {
console.log("hollo routers")
res.send("hello routers")
})


module.exports = router
