import express from 'express';
import {json, urlencoded} from 'body-parser';
import path from 'path';

// declare port number
const PORT = 3000;

// initialize a new express app
const app = express();

// setup app to use jade to render html files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use body parser middlewares
app.use(json());
app.use(urlencoded({
    extended: false
}));

// use the static public folder to serve content
app.use(express.static(path.join(__dirname, 'public')));

// app routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Home'
    })
})
app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About'
    })
})
app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact'
    })
})

// start listening to a port
app.listen(PORT, () => {
    console.log(`Server successfully running on port ${PORT}`);
})