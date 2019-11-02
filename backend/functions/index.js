const functions = require('firebase-functions');
const express = require('express');
const app = express();

// processing functions
const {getAllPageActivity, receiveHook} = require('./requestHelpers.js');
const {parsePostData} = require('./filters.js');

const asyncMiddleware = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next))
    .catch(next);
};

app.timeout = 0;

app.get('/get-page-posts', asyncMiddleware( 
  async (req, res, next) => {
    try{
      let data = await getAllPageActivity();
      data = await parsePostData(data);
      return res.json(data);
    } catch (e) {
      return res.json({error: e.message});
    }
  })
);
app.get('/hello', (req, res, next)=>{
  return res.json({
      message: 'hello world'
  });
});

app.post('/receive', receiveHook);
app.get('/receive', receiveHook);


exports.app = functions.https.onRequest(app);

