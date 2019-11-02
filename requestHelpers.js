const auth = require('./config.json').access_token;
const fetch = require('node-fetch');
const headers = {
  'Content-Type':'application/json',
  'Authorization': auth
};

const getAllPageActivity = async () => {
    const url = 'https://graph.facebook.com/v3.2/103256931121230/feed';
    return await fetch(url, {
        method: 'get',
        headers
    });
};

const postToPage = async (message) => {
    const url = `https://graph.facebook.com/v3.2/103256931121230/feed?message=${message}`;

    return await fetch(url, {
        method: 'POST',
        headers
    });
};

const receiveHookPost = (req, res) => {
    console.log('can you see me logs?');

    postToPage('skunkisherefromcode').then(() => {
            res.sendStatus(200);
        }, (err) => {
            console.warn(err);
            res.sendStatus(200);
        }
    );
};

const receiveHookGet = (req, res) => {

    const userId = _.get(req, 'query.entry.messaging.sender.id');

    // Your verify token. Should be a random string.
    let VERIFY_TOKEN = "FB_COMMUNITY";

    // Parse the query params
    let mode = req.query['hub.mode'];
    let token = req.query['hub.verify_token'];
    let challenge = req.query['hub.challenge'];
    // Checks if a token and mode is in the query string of the request
    if (mode && token) {

        // Checks the mode and token sent is correct
        if (token === VERIFY_TOKEN) {

            // Responds with the challenge token from the request
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);

        } else {
            // Responds with '403 Forbidden' if verify tokens do not match
            res.sendStatus(403);
        }
    } else {
        res.sendStatus(200);
    }
}

module.exports = {getAllPageActivity, receiveHookPost, receiveHookGet}
