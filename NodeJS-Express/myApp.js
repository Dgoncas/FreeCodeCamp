const express = require('express');
const path = require('path');
const app = express();
const bodyparser = require('body-parser');

require('dotenv').config();

app.use('/', bodyparser.urlencoded({extended:false}));

app.use('/', (req, resp, next) => {
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
});

app.use('/public', express.static(__dirname+'/public'));




app.get('/', (req, resp) => {
    resp.sendFile(path.join(__dirname,'views','index.html'));
});

app.get('/json', (req, resp) => {
    let message = "Hello json";

    if(process.env.MESSAGE_STYLE === "uppercase")
        message = message.toUpperCase();

    resp.json({ "message": message});
});

app.get('/now',(req, resp, next ) =>{
    req.time = new Date().toString();
    next();
}, (req, resp) => {
    resp.json({ time: req.time });
});

app.get('/:word/echo', (req, resp) => {
    resp.json({ echo: req.params.word });
});

app.get('/name' ,(req,resp) => {
    resp.json({name: `${req.query.first} ${req.query.last}`});
});

app.post('/name' , (req,resp) => {
    resp.json({ name: `${req.body.first} ${req.body.last}` });
});



module.exports = app;