const auth = require('./config.json').access_token;
const fetch = require('node-fetch');
const headers = {
  'Content-Type':'application/json',
  'Authorization': auth
};
// just for me to look at
const postStructure = {
  message: null,
  geo_locations: {
    zips: [
      {key: null}
    ]
  }
}
const getAllPageActivity = (req, res) => {
  const url = 'https://graph.facebook.com/v3.2/103256931121230/feed';
  return fetch(url, {
    method: 'get',
    headers
  }).then(data=>{
    // object.entities
    return data.json().then(parsedData => {
      return res.json(parsedData);
    });
  });
}

module.exports = {getAllPageActivity}