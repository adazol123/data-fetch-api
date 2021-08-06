const express = require("express");
const router = express.Router();
const Crypto = require("../models/Crypto");
const MessData = require('../Data/MessData')

router.get("/", (request, response) => {
  response.send({
    Server: "Welcome to the other side of the world V2",
    Message: "Almost there",
  });
});


router.get("/coin", async (request, response) => {
    const { limit, page} = request.query
    const data = await getCoinMess(limit,page)
    response.send(data);
    return console.log(" OK !");
});

async function getCoinMess(limit,page) {
    let domain = 'https://data.messari.io'
    let path = '/api/v1/assets'
    let query_limit = limit? `?limit=${limit}` : ''
    let query_page = page? `&page=${page}`: ''
    let url = [domain, path, query_limit, query_page].join('')
    let result = await MessData(url);
    return result
}


module.exports = router;
