'use strict';

const express = require('express'),
mongoose = require('mongoose'),
router = express.Router(),
User = require('../models/user');

router.get('/', (req, res, next)=>{
    let pageData = {
        title: 'Home'
    }

    if(req.session.userId){
        pageData.loggedIn = true;
    }

    return res.render('index', pageData);
});

router.get('/notes', (req, res, next)=>{
    let pageData = {
        title: 'Notes',
        pageUp: 'Home',
        pageUpSrc: '/'
    }
    if(req.session.userId){
        pageData.loggedIn = true;
    }
    return res.render('notes', pageData);
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
    if(req.body.username && req.body.email && req.body.password && req.body.confirmpassword){
        console.log(req.body)
        if( req.body.password === req.body.confirmpassword) {
            let userData = {
                name: req.body.username,
                email: req.body.email,
                password: req.body.password
            }

            User.create(userData, (error, user ) => {
                if(error) {
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
    if(req.session.userId){
        pageData.loggedIn = true;
        return res.redirect('/')
    }
    return res.render('login', pageData);
});

router.post('/login', (req, res, next) => {
    if(req.body.email && req.body.password){
        User.authenticate(req.body.email, req.body.password, function(error, user){
            if(error || !user){
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

router.get('/logout', (req,res,next) => {
    req.session.destroy();
    return res.redirect('/');
})
 
router.get('/dashboard', (req, res, next)=>{
    if(req.session.userId){
        let pageData = {
            title: 'Dashboard',
            pageUp: 'home',
            pageUpSrc: '/'
        }
        if(req.session.userId){
            pageData.loggedIn = true;
        }
        return res.render('dashboard');
    } else {
        return res.redirect('/');
    }
});



module.exports = router;