var request = require('request')

let _COIN_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=php&order=market_cap_desc&per_page=100&page=1&sparkline=false'


module.exports = (req, res) => {
    request(_COIN_URL, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            console.log('fetching data ...', req.originalUrl)
            var parsedBody = JSON.parse(body)
            res.send(parsedBody)
        }
    })
};