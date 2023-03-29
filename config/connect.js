const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/ecomerce")
.then(
    ()=>{
        console.log("DataBase connected");
    }
)
.catch(
    (err) => {
    console.log(err);
}
)

module.exports = mongoose 