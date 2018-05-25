// app/routes.js
var mysql = require('mysql');
var dbconfig = require('../config/database');
var connection = mysql.createConnection(dbconfig.connection);
connection.query('USE ' + dbconfig.database);
var username = "";
module.exports = function (app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function (req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function (req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') });
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        //successRedirect : '/profile', // redirect to the secure profile section
        successRedirect: '/mydashboard',
        failureRedirect: '/login', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }),
        //function (req, res, next) {
        //    if (!req.body.remember_me) {
        //        return next();
        //    }

        //    var token = utils.generateToken(64);
        //    Token.save(token, { userId: req.user.id }, function (err) {
        //        if (err) {
        //            return done(err);
        //        }
        //        res.cookie('remember_me', token, { path: '/', httpOnly: true, maxAge: 604800000 })
        //        return next();
        //    });
        //},
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

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function (req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });

    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile', // redirect to the secure profile section
        failureRedirect: '/signup', // redirect back to the signup page if there is an error
        failureFlash: true // allow flash messages
    }));

    // =====================================
    // PROFILE SECTION =========================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function (req, res) {
        res.render('profile.ejs', {
            user: req.user // get the user out of session and pass to template
        });
    });

    app.get('/mydashboard', function (req, res) {
        username = req.user.username;
        var sql = "SELECT DISTINCT books.*, bookmarks.userID, bookmarks.PageNumber, bookmarks.ID as bookmarkID FROM books "
        + "LEFT JOIN bookmarks "
        + "ON "
        + "bookmarks.bookID = books.id "
        + "AND bookmarks.UserID = books.UserID "
        + "WHERE bookmarks.userID = '" + username + "' OR books.userID = '" + username +"'";
        connection.query(sql, function (err, rows, fields) {
            if (!!err) {
                console.log('Error in query ' + err);
            } else {
                console.log('Successful\n');
                console.log(rows);
                resultItems = rows;
                console.log(resultItems);

                res.render('mydashboard.ejs', {
                    name: username,
                    items: resultItems
                });
            }
        });
        //connection.end;
    });

    app.post('/addBkmrk', function (req, res) {
        var bookmarkID = req.body.bookmarkID;
        var v_bookmark = req.body.newMark; //+ v_bookmark;
        var v_id = req.body.ID;
        var sql = '';
        if (bookmarkID == "") {
            sql = "insert into bookmarks (pagenumber, userID, bookID) values (?,?,?) ";
        } else {
            v_id = bookmarkID;
            sql = "update bookmarks set pagenumber=?,userID=? WHERE id =?";
        }
        var username = req.user.username;
        console.log("post...\n" + v_bookmark);
        console.log("post...\n" + v_id)
        

        // connection.query("insert into bookmarks (bookid, pagenumber, userID) values (?,?,?) ",
        connection.query(sql,
            [v_bookmark,username,v_id], function (err, result) {
                if (err) throw err;
                 console.log("Number of records inserted: " + result.affectedRows);
            });
        res.redirect('/mydashboard');
    });

    app.post('/add', function (req, res) {
        var newTitle = req.body.newItem;
        var newAuthor = req.body.newAuthor;
        var newPages = req.body.newPages;
        var username = req.user.username;

        console.log("post...\n" || newItem);

        connection.query("insert into books (title, author, pages, userID) values (?,?,?,?)",
            [newTitle, newAuthor, newPages, username], function (err, result) {
                if (err) throw err;
                console.log("Number of records inserted: " + result.affectedRows);
            });
        res.redirect('/mydashboard');
    });
    app.post('/reorder', function (req, res) {
        username = req.user.username;
        var v_orderBy = req.body.orderBy;

        var sql = "SELECT DISTINCT books.*, bookmarks.userID, bookmarks.PageNumber, bookmarks.ID as bookmarkID FROM books "
            + "LEFT JOIN bookmarks "
            + "ON "
            + "bookmarks.bookID = books.id "
            + "AND bookmarks.UserID = books.UserID "
            + "WHERE bookmarks.userID = '" + username + "' OR books.userID = '" + username + "' ORDER BY " + v_orderBy;
        console.log("post REORDER >>>>>>..." + v_orderBy);

        connection.query(sql, function (err, rows, fields) {
            if (!!err) {
                console.log('Error in query ' + err);
            } else {
                console.log('Successful\n');
                console.log(rows);
                resultItems = rows;
                console.log(resultItems);

                res.render('mydashboard.ejs', {
                    name: username,
                    items: resultItems
                });
            }
        });
    });

    
    // =====================================
    // GOOGLE ROUTES =======================
    // =====================================
    // send to google to do the authentication
    // profile gets us their basic information including their name
    // email gets their emails
    app.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

    // the callback after google has authenticated the user
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/profile',
            failureRedirect: '/'
        })
    );

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function (req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
