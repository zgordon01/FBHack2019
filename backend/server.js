const express = require('express');
const app = express();
const port = process.env.PORT || 5000;

app.timeout = 0;

app.get('/hello', (req, res, next)=>{
  return res.json({
    message: 'hello world'
  });
});
app.listen(port, () => console.log(`Listening on port ${port}`));
