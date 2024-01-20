let mongoose = require("mongoose")
// let bcrypt = require('bcrypt')

let Authentication = new mongoose.Schema({
    username : {
        type : String,
        required : true,
        unique : true

    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : String,
})

// USER.pre('save',()=>{
//     const user = this
//     bcrypt.hash(user.password,9,(err,hash)=>{
//         user.password = hash
//     })
// })

module.exports = mongoose.model("authentication",Authentication)