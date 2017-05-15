'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _nodemailer = require('nodemailer');

var _nodemailer2 = _interopRequireDefault(_nodemailer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// declare port number
var PORT = 3000;

// initialize a new express app
var app = (0, _express2.default)();

// setup app to use jade to render html files
app.set('views', _path2.default.join(__dirname, 'views'));
app.set('view engine', 'jade');

// use body parser middlewares
app.use((0, _bodyParser.json)());
app.use((0, _bodyParser.urlencoded)({
    extended: false
}));

// use the static public folder to serve content
app.use(_express2.default.static(_path2.default.join(__dirname, 'public')));

// app routes
app.get('/', function (req, res) {
    res.render('index', {
        title: 'Home'
    });
});
app.get('/about', function (req, res) {
    res.render('about', {
        title: 'About'
    });
});
app.get('/contact', function (req, res) {
    res.render('contact', {
        title: 'Contact'
    });
});
app.post('/contact/send', function (req, res) {
    console.log(req.body);
    console.log('Ready to send...');

    // using nodemailer to send email

    // create reusable transporter object using the default SMTP transport
    var transporter = _nodemailer2.default.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodeahmed001@gmail.com',
            pass: 'abcde321'
        }
    });

    // setup email data with unicode symbols
    var mailOptions = {
        from: 'Node Ahmed <nodeahmed001@gmail.com>',
        to: 'npranto@gmail.com',
        subject: 'Did NodeMailer Work?',
        text: 'Hey, you received an email from ' + req.body.name + ' saying: \n Name: ' + req.body.name + ' \n Email: ' + req.body.email + ' \n Message: ' + req.body.message + ' \n',
        html: '\n            <p> \n                Hey,\n            </p>\n            <p> \n                You received an email from <strong>' + req.body.name + '</strong> saying: \n            </p>\n            <p>\n                Name: ' + req.body.name + '\n                <br />\n                Email: ' + req.body.email + '\n                <br />\n                Message: ' + req.body.message + '\n            </p>\n        '
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function (err, info) {
        if (err) {
            return console.log(err);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.redirect('/');
    });

    console.log('Sent...');
});

// start listening to a port
app.listen(PORT, function () {
    console.log('Server successfully running on port ' + PORT);
});