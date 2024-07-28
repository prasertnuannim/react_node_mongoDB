const Products = require("../models/Product");

exports.create = async (req, res) => {
  try {
    console.log(req.body);
    const newProduct = await new Products(req.body).save();
    res.json(newProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};

exports.list = async (req, res) => {
  try {
    const listProduct = await Products.find({}).exec();
    res.json(listProduct);
  } catch (error) {
    console.log(error);
    res.status(400).send("Something went wrong");
  }
};
exports.read = async (req, res) => {
    try {
       console.log(req.params.id);
       const id = req.params.id
       const readProduct = await Products.findOne({_id:id}).exec();
       res.send(readProduct);
      } catch (error) {
        console.log(error);
        res.status(400).send("Something went wrong");
      }
};

exports.update = async (req, res) => {
    try {
        const id = req.params.id
        const updateProduct = await Products.findOneAndUpdate({_id:id}, req.body, {new:true}).exec();
        res.send("update success");
       } catch (error) {
         console.log(error);
         res.status(400).send("Something went wrong");
       }
};

exports.remove = async (req, res) => {
    try {
        console.log(req.params.id);
        const id = req.params.id
        const removeProduct = await Products.findOneAndDelete({_id:id}).exec();
        res.send("delete success");
       } catch (error) {
         console.log(error);
         res.status(400).send("Something went wrong");
       }
};
