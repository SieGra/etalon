'use strict';

const express = require('express'),
    mongoose = require('mongoose'),
    router = express.Router(),
    User = require('../models/user'),
    Blogpost = require('../models/blogpost');

router.get('/', (req, res, next) => {
    let pageData = {
        title: 'Home'
    }

    if (req.session.userId) {
        pageData.loggedIn = true;
    }

    return res.render('index', pageData);
});

router.get('/notes', (req, res, next) => {
    let pageData = {
        title: 'Notes',
        pageUp: 'Home',
        pageUpSrc: '/',
    }

    if (req.session.userId) {
        pageData.loggedIn = true;
    }

    var blogPormise = new Promise(function(resolve, reject) {
        let object;

        Blogpost.find({}, function(error, result){
            if(error) return next(error);
            object = result;
            resolve(object);
        });

    });

    blogPormise.then(function(blogposts) {
       let arr = [];
       let blogListPromise = new Promise(function(resolve, reject){

        for(let i = 0; i < blogposts.length; i++){
            let b = blogposts[i];
            let substring = b.body.substring(0, 100);
            let obj = {
                title: b.title,
                body: b.body,
                bodyPreview: substring,
                imagesrc: b.imagesrc,
                imagealt: b.imagealt,
                blognumber: b.blognumber
            }
            arr.push(obj);
        }
        resolve(arr);
       });

       blogListPromise.then(function(){
            pageData.blogposts = arr;
           return res.render('notes', pageData);

       }).catch(function(reason){
        let err = new Error('Something went wrong, try refreshing the page.');
        err.status = 400;
        return next(err);
       });

    }).catch(function(reason){
        let err = new Error('Something went wrong, try refreshing the page.');
        err.status = 400;
        return next(err);
    })
        
});

router.post('/notes', (req, res, next) => {
    let arr = [];
    Blogpost.find({}, (err, blogposts) => {
        if (err) {
            return next(err);
        } else {
            if(blogposts) arr.push(blogposts);
        }
    }).exec(() => {
        if (arr.length > 0) {
            res.json(arr)
        } else {
            res.redirect('/notes')
        }
    })

});

router.get('/createadmin', (req, res, next) => {
    let pageData = {
        title: 'Create Admin',
        pageUp: 'Home',
        pageUpSrc: '/'
    }
    if(req.session.userId) {
    return res.render('createadmin', pageData);
    } else {
        return res.redirect('/login');
    }

})

router.post('/createadmin', (req, res, next) => {
    if (req.body.username && req.body.email && req.body.password && req.body.confirmpassword) {
        if (req.body.password === req.body.confirmpassword) {
            let userData = {
                name: req.body.username,
                email: req.body.email,
                password: req.body.password
            }

            User.create(userData, (error, user) => {
                if (error) {
                    return next(error);
                } else {
                    return res.redirect('/login');
                }
            })
        } else {
            let err = new Error('Passwords do not match!');
            err.status = 400;
            return next(err);
        }

    } else {
        let err = new Error('All fields are required.');
        err.status = 400;
        return next(err);
    }
});

router.get('/login', (req, res, next) => {
    let pageData = {
        title: 'Login',
        pageUp: 'Home',
        pageUpSrc: '/'
    }
    if (req.session.userId) {
        pageData.loggedIn = true;
        return res.redirect('/')
    }
    return res.render('login', pageData);
});

router.post('/login', (req, res, next) => {
    if (req.body.email && req.body.password) {
        User.authenticate(req.body.email, req.body.password, function (error, user) {
            if (error || !user) {
                let err = new Error('Wrong email or password');
                err.status = 403;
                return next(err);
            } else {
                req.session.userId = user._id;
                req.session.name = user.name;
                return res.redirect('/dashboard');
            }

        });
    }
});

router.get('/logout', (req, res, next) => {
    req.session.destroy();
    return res.redirect('/');
})

router.get('/dashboard', (req, res, next) => {
    if(req.session.userId){
    let pageData = {
        title: 'Dashboard',
        pageUp: 'Home',
        pageUpSrc: '/'
    }
    if(req.session.userId){
    pageData.loggedIn = true;
    return res.render('dashboard', pageData);
    }
    } else {
    return res.redirect('/');
    }
});

router.post('/dashboard', (req, res, next) => {
    if (req.body.title && req.body.articlebody && req.body.imagesrc && req.body.imagealt) {
        let blogData = {
            title: req.body.title,
            body: req.body.articlebody,
            imagesrc: req.body.imagesrc,
            imagealt: req.body.imagealt
        }
        
        Blogpost.create(blogData, (error, user) => {
            if (error) {
                return next(error);
            } else {
                res.redirect('/notes');
            }
        })
    }

});

router.get('/article/:id', (req, res, next)=>{

    let oneBlogPromise = new Promise(function(resolve, reject){
        let pageData = {
            title: '',
            pageUp: 'Notes',
            pageUpSrc: '/notes',
            twoPageUp: 'Home',
            twoPageUpSrc: '/',
            object: {}
        }
        
        let blogposts = {};
        let blognumber = req.params.id;
        Blogpost.findOne({blognumber: blognumber}, function(error, r){
            if (error) return next(error);
            pageData.title = "Article: " + r.title;
            blogposts.title = r.title;
            blogposts.body = r.body;
            blogposts.imagesrc = r.imagesrc;
            blogposts.imagealt = r.imagealt;
            blogposts.blognumber = r.blognumber;

            pageData.object = blogposts;
            resolve(pageData)
        });
    })

    oneBlogPromise.then(function(result) {
        res.render('article', result);
    });
});


module.exports = router;