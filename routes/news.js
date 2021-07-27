const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()
const News = require('../models/News')
const { format } = require('timeago.js')


const newsData = async (type, query, sortBy, country, key, token ) => {
    let url_newsapi = `https://newsapi.org/v2/top-headlines?category=business${sortBy}${country}&language=en&apiKey=${key}`
    let url_gnews = `https://gnews.io/api/v4/${type}?${query}${country}${sortBy}$&lang=en&token=${token}`
    try {
        let response_news  = await  fetch(url_newsapi)
        let response1 =  response_news.json()
        let response_gnews = await  fetch(url_gnews)
        let response2 =  response_gnews.json()
        const data = await Promise.all([response1, response2])
        console.log( "✅ Dual fetch success!" , url_newsapi)
        return data
        
    } catch (error) {
        console.log('news Data error', url_gnews)
    }
}

router.get('/:type', async (request,response) => {
    try {
        const { q, from, sortBy, country, language } = request.query
        const param =  {
            type: request.params.type? request.params.type: 'everything',
            query: q? `q=${q}`: '', // sample: bitcoin
            country: country? `&country=${country}` : '&country=ph',
            from: from? `&from=${from}`: '', //date
            sortBy: sortBy? `&sortBy=${sortBy}`: '', //publishedAt
            language: language? `&language=${language}` : '&language=en', //en
        }
        const key =  q? process.env.REACT_APP_NEWS_API_KEY : null
        const token = q? process.env.REACT_APP_GNEWS_API_KEY : null
        const result = await newsData(param.type, param.query, param.sortBy, param.country, key, token)
        const [{ articles: articles1,...rest1},{articles: articles2,...rest2}] = result
        const news_data = [...articles1,...articles2]
        console.log( "✅ ",news_data.length)
        const updatedNews = await News.updateOne(
            { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
            { $set: {news_data, news_updated_at : Date.now()} }
          );
        console.log("✅  News V1 | Last Update :", format(Date.now(), 'en_US'));
    
        return response.json({ 
          message : news_data.message || news_data.status , 
          status: response.statusCode,
          counts: news_data.length,
          query: param,
          data_fetched : format(Date.now(), 'en_US'),
        });
    
      } catch (error) {
        console.log("🏴󠁧󠁢󠁳󠁣󠁴󠁿  Error on fetch" , error  ); 
      }
})


module.exports = router