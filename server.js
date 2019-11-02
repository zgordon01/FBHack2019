const {getAllPageActivity: getAllPageActiivty, receiveHook, queryPage} = require('./requestHelpers.js');
const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

// processing functions
const {getAllPageActivity, receiveHookPost, receiveHookGet} = require('./requestHelpers.js');
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

app.get('/react', asyncMiddleware(
  async (req, res, next) => {
    const queryParams = '?fields=id,name,posts{reactions,message}';
    try{
      let data = await queryPage(queryParams);
      data = await parsePostData(data);
      data = data.filter(post =>{
        const reacts = getReactCountFromPost(post);
        reacts.angry.length ? true : false;
      });
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

app.post('/receive', receiveHookPost);
app.get('/receive', receiveHookGet);


app.listen(port, () => console.log(`Listening on port ${port}`));
