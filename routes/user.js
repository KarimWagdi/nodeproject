const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

router.post("/register" , async (req, res) => {
    data = req.body;
    usr = new User(data);
    salt = bcrypt.genSaltSync(10);
    cryptedPass = await bcrypt.hashSync( data.password , salt);
    usr.password = cryptedPass;
    usr.save()

    .then(
        (saved) => {
            res.send(saved);
        }
    )
    .catch(
        (err)=>{
            res.send(err);
        }
    )
})

router.post("/add", async (req , res) => {

    try {
        data = req.body;
        usr = new User(data)
        savedData = await usr.save();
        res.status(200).send(savedData)

    } catch (error) {
        res.status(400).send(error)
    }
});

router.get("/", async (req, res) => {
    try {

       users = await User.find()
        res.status(200).send(users)

    } catch (error) {
        res.status(400).send(error)
    }
});

router.get("/:id", (req, res) =>{
    userId = req.params.id

    User.findOne({ _id : userId})
    .then(
        (user) => {
            res.status(200).send(user)
        }
    )
    .catch(
        (err) => {
            res.status(400).send(err)
        }
    )
});

router.put("/update/:id", async (req, res) => {
    try {
        id = req.params.id
        updatedData = req.body
        updatedUser = await User.findByIdAndUpdate({ _id: id } , updatedData)
        res.status(200).send(updatedUser)
    } catch (error) {
        res.status(400).send(error)
    }
});

router.delete("/delete/:id", async (req, res)=> {
    try {
        id = req.params.id 
        deletedUser = await User.findOneAndDelete({ _id:id })
        res.status(200).send("User Deleted")
    } catch (error) {
        res.status(400).send(error)
    }
});

module.exports = router