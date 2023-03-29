const express = require("express");
const router = express.Router();
const Product = require("../models/product");

const multer = require("multer");

filename = "";
const mystorage = multer.diskStorage({
    destination: "../uploads",
    filename: (req, file, redirect) => {
        
        let date = Date.now();
        let fl = date + "." + file.mimetype.split("/")[1];
        redirect(null, fl);
        filename = fl;
    }

})

const upload = multer({storage : mystorage});

router.post("/addProduct", upload.any("image"), async (req , res) => {

    try {
        data = req.body;
        product = new Product(data)
        product.image = filename;
        savedProduct = await product.save();
        filename = "" ;
        res.status(200).send(savedProduct)

    } catch (error) {
        res.status(400).send(error)
    }
});

router.get("/allProducts", async (req, res) => {

    try {
        products = await Product.find( );
        res.status(200).send(products)

    } catch (error) {
        res.status(400).send(error)
    }
});

router.get("/product/:id", (req, res) =>{
    productId = req.params.id

    Product.findOne({ _id : productId})
    .then(
        (product) => {
            res.status(200).send(product)
        }
    )
    .catch(
        (err) => {
            res.status(400).send(err)
        }
    )
});

router.put("/updateProduct/:id", async (req, res) => {
    try {
        id = req.params.id
        updatedData = req.body
        updatedProduct = await Product.findByIdAndUpdate({ _id: id } , updatedData)
        res.status(200).send(updatedProduct)
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete("/product/:id", async (req, res)=> {
    try {
        id = req.params.id 
        deletedProduct = await Product.findOneAndDelete({ _id:id })
        res.status(200).send("Product Deleted")
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router