import express from 'express';
import {json, urlencoded} from 'body-parser';
import path from 'path';
import nodemailer from 'nodemailer';

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
app.post('/contact/send', (req, res) => {
    console.log(req.body);
    console.log('Ready to send...');

    // using nodemailer to send email

    // create reusable transporter object using the default SMTP transport
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'nodeahmed001@gmail.com',
            pass: 'abcde321'
        }
    })

    // setup email data with unicode symbols
    const mailOptions = {
        from: 'Node Ahmed <nodeahmed001@gmail.com>',
        to: 'npranto@gmail.com',
        subject: 'Did NodeMailer Work?',
        text: `Hey, you received an email from ${req.body.name} saying: \n Name: ${req.body.name} \n Email: ${req.body.email} \n Message: ${req.body.message} \n`,
        html: `
            <p> 
                Hey,
            </p>
            <p> 
                You received an email from <strong>${req.body.name}</strong> saying: 
            </p>
            <p>
                Name: ${req.body.name}
                <br />
                Email: ${req.body.email}
                <br />
                Message: ${req.body.message}
            </p>
        `
    }

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
            return console.log(err);
        }
        console.log('Message %s sent: %s', info.messageId, info.response);
        res.redirect('/');
    })

    console.log('Sent...');
})

// start listening to a port
app.listen(PORT, () => {
    console.log(`Server successfully running on port ${PORT}`);
})