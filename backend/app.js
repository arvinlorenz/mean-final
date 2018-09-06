const path = require('path'); //construct paths in a way htats safe to run on any operation system
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const postsRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();


mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/Mean")
    .then(()=>{
        console.log('Connected to Database!');
    })
    .catch(()=>{
        console.log('Connection failed!');
    });
app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname,'images'))); //will be allowed to continue and fetch the files from there; /images request will be forwarded to /backend/images
app.use('/', express.static(path.join(__dirname,'angular')));

app.use((req,res,next)=>{
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers',
        'Origin,X-Requested-With, Content-Type,Accept,Authorization');
    res.setHeader('Access-Control-Allow-Methods', 
        "GET, POST, PATCH, PUT, DELETE, OPTIONS");
    next();
});

app.use('/api/posts',postsRoutes);
app.use('/api/user',userRoutes);
app.use((req,res,next)=>{
    res.sendFile(path.join(__dirname,'angular', index.html))
}) //return to index if not about routes



module.exports = app;