

/**
 * Required External Modules
 */
const express = require("express");
const app = express();
const port = process.env.PORT || "5000";

const path = require("path");
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
// app.set("views","./views");
// app.set("view engine", "ejs");

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
// app.get("/", (req, res) => {
//     res.sendFile(__dirname + '/views/index.html')
// });
// app.get("/facial", (req, res) => {
//     res.sendFile(__dirname + '/views/facial.html')
// });
/**
 * Server Activation
 */
if (port == null || port == "") {
    port = 5000;
}
app.listen(port, () => {
    console.log(`Listening to requests on http://localhost:${port}`);
});