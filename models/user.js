const mongoose = require("mongoose");

const User = mongoose.model("User", {

    firstName:{
        type:String
    },

    lastName:{
        type:String
    },

    age:{
        type:Number
    },

    email:{
        type:String
    },
    
    passWord:{
        type:String
    }
})
module.exports = User