const express = require("express");
require("./config/connect");

const productRouter = require("./routes/product");
const userRouter = require("./routes/user");

const app = express();
app.use(express.json());

app.use("/user" , userRouter);
app.use("/product", productRouter);

app.use("/getimage", express.static("./uploads"))

app.listen(3000, () =>{
    console.log("server is running");
});