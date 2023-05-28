const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Register = new Schema({
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
        required: true,
    }
})
const model = mongoose.model("Register", Register)
module.exports = model