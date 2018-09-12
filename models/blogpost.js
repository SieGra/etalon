'use strict';
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    body: {
        type: String,
        required: true
    }
});

const blogPost = mongoose.model('Blogpost', blogPostSchema)

module.exports = blogPost;