const functions = require('firebase-functions');
const {getAllPageActivity: getAllPageActiivty, receiveHook} = require('./requestHelpers.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.timeout = 0;

app.get('/get-page-activity', getAllPageActiivty);
app.get('/hello', (req, res, next)=>{
    return res.json({
        message: 'hello world'
    });
});

app.post('/receive', receiveHook);
app.get('/receive', receiveHook);


exports.app = functions.https.onRequest(app);

