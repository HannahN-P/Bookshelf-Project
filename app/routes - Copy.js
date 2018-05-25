
var express = require('express');
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var username = "";

module.exports = function (app, passport) {
    // home page with login links
    app.get('/', function (req, res) {
        res.render('index.ejs');
    });
    // login - show the login form
    app.get('/login', function (req, res) {
        //render the login page and pass in any flash data if exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });
    //process the login form


    app.post('/login', passport.authenticate('local-login', {
        //successRedirect: 'profile', // redirect to a secure profile section
        successRedirect: '/mydashboard',
        failureRedirect: '/login',
        failureFlash: true
        }),
        function (req, res) {
            username = res.user.name;
            console.log("hello " + res.user.name);

            if (req.body.remember) {
                req.session.cookie.maxAge = 1000 * 60 * 3;
            } else {
                req.session.cookie.expires = false;
            }
        res.redirect('/');
    });

    app.get('/signup', function (req, res) {
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }));

    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // gets user out of session
        });
    });

    app.get('/mydashboard', function (req, res) {
        var sql = "SELECT * FROM books";
        username = req.user.username;
        connection.query(sql, function (err, rows, fields) {
            if (!!err) {
                console.log('Error in query ' + err);
            } else {
                console.log('Successful\n');
                console.log(rows);

                resultItems = rows;

                res.render('mydashboard.ejs', {
                    name: username,
                    items: resultItems
                });
            }
        });
        // connection.end;
    });

    app.post('/add_book', function (req, res) {
        var newTitle = req.body.newItem;
        var newAuthor = req.body.newAuthor;
        var newPages = req.body.newPages;

        console.log("post...\n" || newItem);
        // resultItems.push({
        //     title: newItem
        // });

        connection.query("insert into books (title, author, pages) values (?, ?, ?)",
            [newTitle, newAuthor, newPages], function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
        res.redirect('/mydashboard');
    });

    app.post('/add', function (req, res) {
        var newTitle = req.body.newItem;
        var newAuthor = req.body.newAuthor;
        var newPages = req.body.newPages;

        console.log("post...\n" || newItem);

        connection.query("insert into books (title, author, pages) values (?, ?, ?)",
            [newTitle, newAuthor, newPages], function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
        res.redirect('/mydashboard');
    });

    // GOOGLE ROUTES
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        })
    );

    // LOGOUT
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });

};

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated())
        return next();
    res.redirect('/');
}