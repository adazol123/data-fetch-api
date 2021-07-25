const express = require('express')
const fetch = require('node-fetch')
const router = express.Router()
const News = requer('../models/Crypto')


router.get('/', async (request,response) => {
    try {
        const { q, from, sortBy, language } = request.query
        const param =  {
          query: q? `q=${q}`: '', // sample: bitcoin
          from: from? `&from=${from}`: '', //date
          sortBy: sortBy? `&sortBy=${sortBy}`: '', //publishedAt
          language: language? `&language=${language}` : '&language=en', //en
        }
        const key =  q? process.env.REACT_APP_NEWS_API_KEY : null
        const news_url =
        `https://newsapi.org/v2/everything?${param.query}${ param.from}${param.sortBy}${param.language}&apiKey=${key}`;
        console.log( "✅ ",news_url)
        const fetch_response = await fetch(news_url);
        const news_data = await fetch_response.json();
        const updatedNews = await News.updateOne(
            { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
            { $set: {news_data, news_updated_at : Date.now()} }
          );
        console.log("✅  News V1 | Last Update :", format(Date.now(), 'en_US'));
    
        return response.json({ 
          message : news_data.message || news_data.status , 
          status: response.statusCode,
          // counts: news_data.articles.length,
          query: param,
          data_fetched : format(Date.now(), 'en_US')
        });
    
      } catch (error) {
        console.log("🏴󠁧󠁢󠁳󠁣󠁴󠁿  Error on fetch" , error  ); 
      }
})