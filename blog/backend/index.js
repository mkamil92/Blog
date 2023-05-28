const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
const Register = require('./model/registeration.model')
const Post = require('./model/post.model')

app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://localhost:27017/blog", {useNewUrlParser: "true"})

app.post('/api/register',async (req, res)=>{
    console.log(req.body)
    try{
        await Register.create({
            email: req.body.email,
            password: req.body.password,
        })
        
        res.json({status:'ok'})
    }
    catch(error){
        res.status(400).json({error: 'Duplicate Email...'})
    }
    
})

app.post('/api/sign-in', async(req, res)=>{
    console.log(req.body)
    let user = await Register.findOne({email:req.body.email, password: req.body.password})
    if(user){
        res.status(200).json({message:'successfull login'})
    }
    else{
        res.status(400).json({error:"Wrong Credentials"})
    }

})


app.post('/api/post',async (req, res)=>{
    console.log(req.body)
    const title = req.body.title;
    const description = req.body.description;
    const email = req.body.email;
    try{
        await Post.create({
            title: title,
            description: description,
            email: email,
        })
        
        res.json({status:'ok'})
    }
    catch(error){
        res.status(400).json({error: 'Duplicate Email...'})
    }
    
})

app.get('/api/get-all-posts',async (req, res)=>{
   console.log('coming')
    try{
        const posts = await Post.find()
        console.log(posts)
        
        res.json({status:'ok', posts: posts})
    }
    catch(error){
        res.status(400).json({error: 'Duplicate Email...'})
    }
    
})

app.post('/api/get-posts',async (req, res)=>{
    let posts = await Post.find({email:req.body.email})
    if(posts){
        res.json({status:'ok', posts:posts})
    }
    else{
        res.status(400).json({error:"Wrong Credentials"})
    }

    
})

app.post('/api/edit',async (req, res)=>{
    console.log(req.body)
    const editTitle = req.body.editTitle;
    const editDescription = req.body.editDescription;
    const email = req.body.email;
    const activeTitle = req.body.activeTitle;
    const activeDescription = req.body.activeDescription;


    try{
        let result = await Post.updateOne({
            title: activeTitle,
            description: activeDescription,
        },{
            $set:{title: editTitle, description: editDescription}
        })
        console.log(result)
        res.json({status:'ok'})
    }
    catch(error){
        res.status(400).json({error: 'Unable to update...'})
        
    }
    
})


app.post('/api/delete',async (req, res)=>{
    console.log(req.body)
   
    const activeTitle = req.body.activeTitle;
    const activeDescription = req.body.activeDescription;


    try{
        let result = await Post.deleteOne({
            title: activeTitle,
            description: activeDescription,
        })
        console.log(result)
        res.json({status:'ok'})
    }
    catch(error){
        res.status(400).json({error: 'Unable to update...'})
        
    }
    
})
app.listen(1337,()=>{
    console.log("Server started on 1337...")
})