const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Post = new Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    email:{
        type:String,
        required: true,
    },
    comment:{
        type: String,
    }
})
const model = mongoose.model("Post", Post)
module.exports = model