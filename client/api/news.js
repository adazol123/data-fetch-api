var request = require('request')


let _NEWS_URL = `https://newsapi.org/v2/top-headlines?category=business&country=ph&apiKey=${process.env.REACT_APP_NEWS_KEY}`


module.exports = (req, res) => {
    request(_NEWS_URL, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log('fetching data ...', req.originalUrl)
            var parsedBody = JSON.parse(body)
            res.send(parsedBody)
        }
    })
};