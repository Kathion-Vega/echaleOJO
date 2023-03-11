

/**
 * Required External Modules
 */
const express = require("express");
const app = express();
const port = process.env.PORT || "5000";

const path = require("path");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('passport-local');
const bodyParser = require('body-parser');
const db = require('./db');
const cors = require('sqlite3', 'cors');
/**
 * App Variables
 */


// Static Files
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(express.static(__dirname + '/public/'));
app.use('/css', express.static(__dirname + '/public/css'))
app.use('/js', express.static(__dirname + '/public/js'))
app.use('/img', express.static(__dirname + '/public/img'))
/**
 *  App Configuration
 */



app.use(session({
    secret: "test",
    resave: true,
    saveUninitialized: true

}));
passport.use(new passportLocal.Strategy({
    usernameField: "username",
    passwordField: "password"
},
    (user, password, done) => {

        db.get("select * from user where username = ? and password = ?",
            user, password,
            (err) => {
                if (err)
                    return done("invalid login or password!!!");
                else
                    return done(null, user);
            });
    }));
passport.serializeUser((user, done) => {
    done(null, user);
});
passport.deserializeUser((user, done) => {
    done(null, user);
});

//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));
app.use(passport.initialize());
app.use(passport.session());

//login form
app.get('/login', (req, res) => {
    res.sendFile(`${__dirname}/login`);
})

//login procedure
app.post('/login', passport.authenticate("local", { failureRedirect: '/login' }),
    (req, res) => { res.redirect('/'); });


//registro form
app.get('/registro', (req, res) => {
    res.sendFile(`${__dirname}/registro`);
});

//registro procedure
app.post('/registro', (req, res) => {
    //{failureRedirect: '/registro'},
    db.run("insert into user(id, username, password) values(?, ?, ?)",
        Date.now(),
        req.user,
        req.body.password,
        (err) => {
            if (err)
                res.send(err);
            else
                res.redirect("/login");
        });

});

/**
 * Routes Definitions
 */
app.get('/', (req, res) => {
    res.render('index', { title: "Echale Ojo" });
});
app.get('/mapa', (req, res) => {
    res.render('mapa', { title: "Echale Ojo | mapa" });
});
app.get('/login', (req, res) => {
    res.render('login', { title: "Echale Ojo | Login" });
});
app.get('/registro', (req, res) => {

    res.render('registro', { title: "Echale Ojo | Registro" });
});
app.get('/acerca', (req, res) => {

    res.render('acerca', { title: "Echale Ojo | Acerca" });
});
app.get('/anuncios', (req, res) => {

    res.render('anuncios', { title: "Echale Ojo | anuncios" });
});

app.get('/conoce', (req, res) => {
    res.render('conoce', { title: "Echale Ojo | Conoce" });
});
app.get('/rutas', (req, res) => {
    res.render('rutas', { title: "Echale Ojo | Rutas" });
});
app.get('/blog', (req, res) => {

    res.render('blog', { title: "Echale Ojo | Blog" });
});
app.get('/galeria', (req, res) => {

    res.render('galeria', { title: "Echale Ojo | Galeria" });
});
app.get('/promo', (req, res) => {

    res.render('promo', { title: "Echale Ojo | Promociones" });
});
app.get('*', (req, res) => {
    res.status(404).send('what???');
});

// las rutas de database
app.get('/', (req, res) => {
    if (req.isAuthenticated()) {
        db.all("select * from inventory where resp_person = ?", req.user, (err, rows) => {
            if (err)
                res.send(err);
            else {
                res.send('/rutas', {
                    "inv_list": rows
                });
            }
        });
    } else {
        console.log("Unauthenticated user!!!");
        res.redirect('/login');
    }
});

//anuncios data
app.get('/anuncios', (req, res) => {
    res.sendFile(`${__dirname}/anuncios`);
})

app.post('/anuncios', (req, res) => {
    db.run("insert into inventory(id, title, resp_person) values(?, ?, ?)",
        Date.now(),
        req.body.title,
        req.user,
        (err) => {
            if (err)
                res.send(err);
            else
                res.redirect("/");
        });
});
// update data

app.put('/update/:id', (req, res) => {
    db.run("update into inventory(title, resp_person) values(?, ?) where id = id_value;",
        Date.now(),
        req.body.title,
        req.user,
        (err) => {
            if (err)
                res.send(err);
            else
                res.redirect("/");
        });
});




//delete data
app.post('/delete', (req, res) => {
    console.log(req.body.delid);
    db.run("delete from inventory where id=?",
        req.body.delid,
        (err) => {
            if (err)
                res.send(err);
            else
                res.redirect("/");
        });
});

 //* Server Activation
 
if (port == null || port == "") {
    port = 5000;
}
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});