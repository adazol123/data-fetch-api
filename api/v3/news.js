var request = require('request')


let _NEWS_URL = `https://newsapi.org/v2/everything?q=crypto&sortBy=publishedAt&apiKey=e6fccacdf91948ae83e729466a978e11`


module.exports = (req, res) => {
    request(_NEWS_URL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('fetching data ...', req.originalUrl)
            var parsedBody = JSON.parse(body)
            res.send(parsedBody)
        }
    })
};