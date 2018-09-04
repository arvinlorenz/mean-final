const mongoose = require('mongoose');

//BLUEPRINT
const postSchema = mongoose.Schema({

    title: {
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    imagePath: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", //to which ID will it belong to
        required: true
    }

});

//MODEL
module.exports = mongoose.model('Post', postSchema);
