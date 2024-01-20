let mongoose = require("mongoose")

let USER = new mongoose.Schema({
    fname : String,
    lname : String,
    phone : Number,
    user : {
        type : mongoose.Schema.Types.ObjectId,
        ref : "user"
    }
})

module.exports = mongoose.model("contact",USER)