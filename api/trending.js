var request = require('request')

let _COIN_URL = 'https://api.coingecko.com/api/v3/search/trending'


module.exports = (req, res) => {
    request(_COIN_URL, function(error, response, body) {
        try {
        req.body;
        if (!error && response.statusCode == 200) {
        console.log('fetching data ...', req.originalUrl)
        var parsedBody = JSON.parse(body)
        res.send(parsedBody)
        
        }
        } catch (error) {
        return res.status(400).json({ error: 'My custom 400 error' });
        }

    })
};