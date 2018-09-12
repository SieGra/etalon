'use strict';

const express = require('express'),
mongoose = require('mongoose'),
bodyParser = require('body-parser'),
session = require('express-session'),
app = express();

// Use session to track logins
app.use(session({
    secret: 'you should not be here if you dont want to go away if not',
    resave: true,
    saveUninitialized: false
}));

// MongoDb connection
mongoose.connect('mongodb://localhost:27017/etalons', {useNewUrlParser: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function(){
    console.log('Connected to db - Users')
})


// Parse incomming requests
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}))
    // serve static files (js & css), __dirname is the current folder, public holds our stuff
app.use(express.static(__dirname + "/public"));
    //Set the viewengine to pug
app.set('view engine', 'pug');
        //set the path to the view-files
app.set('views', __dirname + '/views');


// requiring our modules that we made ourselves
const router = require('./routes');
const userRoutes = require('./routes/users');
    //set the homedirectory route
app.use('/', router);

app.use((req, res, next)=>{
    let err = new Error('Page not found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    let sessionInfo = {
        message: err.message,
        code: err.status,
        error: {},
        title: 'Error: '
    }

    res.status = err.status || 500;
    res.render('error', sessionInfo);
});

app.listen(3000, () => {
    console.log('Server started');
});

