'use strict';
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    blognumber: {
        type: Number
    },
    title: {
        type: String,
        required: true
    },
    date: {
        type: String
    },
    body: {
        type: String,
        required: true
    },
    imagesrc: {
        type: String,
        required: true
    },
    imagealt: {
        type: String,
        required: true
    }
});

blogPostSchema.pre('save', function(next) {
    let b = this;
    b.date = new Date().toISOString();
    blogPost.countDocuments({}, (err, count) =>{
        if(err) return next(err);
        b.blognumber = count + 1;
        next();
    })
});


const blogPost = mongoose.model('Blogpost', blogPostSchema);

module.exports = blogPost;