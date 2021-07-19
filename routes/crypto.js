const express = require('express')
const fetch = require("node-fetch");
const router = express.Router()
const Crypto = require('../models/Crypto')
const { format } = require('timeago.js')


router.get('/', (request, response) => {
  response.send({ 
    Server: 'Welcome to the other side of the world', 
    Message: 'Almost there'
  })
})



router.post('/create', async ( request, response) => {
  try {
    const coins = new Crypto({
    coin_data_v1: request.body.coin_data_v1,
    // coin_data_v2: request.body.coin_data_v2,
    // news_data: request.body.news_data,
    })
    const saveData = await coins.save()
    return response.json(saveData)

  } catch(error) { return response.json({ message: error})}
})

/**
 * crypto data
 * credits to https://www.coingecko.com/en
 */
router.get("/crypto/:type/:category", async (request, response) => {
  try {
    const {currency, order, per_page, page, sparkline, price_change} = request.query
    const param = {
      type: request.params.type, //coins / search
      category: request.params.category, //markets / trending
      currency: currency? currency : 'php',
      order: order? `&order=${order}`: '', //market_cap_desc, gecko_desc, gecko_asc, market_cap_asc, market_cap_desc, volume_asc, volume_desc, id_asc, id_desc
      per_page: per_page? `&per_page=${per_page}`:'', //valid values: 1..250
      page: page? `&page=${page}`: '',
      sparkline: sparkline? `&parkline=${sparkline}`: '',
      price_change: price_change? `&price_change_percentage=${price_change}`: '', //price change percentage in 1h, 24h, 7d, 14d, 30d, 200d, 1y (eg. '1h,24h,7d' comma-separated,
      market_chart: `/market_chart`
    }
    const coin_v1_url =
    `https://api.coingecko.com/api/v3/${param.type}/${param.category}?vs_currency=${param.currency}${param.order}${param.per_page}${param.page}${param.sparkline}${param.price_change}`;
    console.log("✅ ",coin_v1_url)
    const fetch_response = await fetch(coin_v1_url);


    if(param.type === 'coins' &&  param.category === 'markets') {
        const coin_data_v1 = await fetch_response.json();
        const updatedCrypto = await Crypto.updateOne(
          { _id: "60f2e23890069202a073e800" },
          { $set: {coin_data_v1, coins_updated_at : Date.now()} }
        );
        console.log("✅  Last Update :", coin_data_v1.length);
        return response.json({ 
          message : 'success!' ,
          counts: coin_data_v1.length,
          status: response.statusCode,
          query : param,
        });
    }

    if(param.type === 'search' &&  param.category === 'trending') {
      const coin_trends = await fetch_response.json();
      const updatedCrypto = await Crypto.updateOne(
        { _id: "60f2e23890069202a073e800" },
        { $set: {coin_trends, coins_updated_at : Date.now()} }
      );
      console.log("✅  Last Update :", coin_trends.length);
      return response.json({ 
        message : 'success!' ,
        counts: coin_trends.length,
        status: response.statusCode,
        query : param,
      });
    }

  } catch (error) {
    console.log("🏴󠁧󠁢󠁳󠁣󠁴󠁿  Error on fetch" , error.message  ); 
  }
});

router.get('/crypto/:type/:coin/:category', async (request, response) => {

  const { days, interval, currency} = request.query
  const param = {
    head: request.params.type, //coins
    coin: request.params.coin, //crypto ID
    category: request.params.category, //market_chart
    currency: currency? `vs_currency=${currency}`: `vs_currency=php`,
    days: days, 
    interval: interval? interval: 'minutely'
  }
  
  try {
    const coin_chart_url =
    `https://api.coingecko.com/api/v3/${param.head}/${param.coin}/${param.category}?${param.currency}&days=${param.days}&interval=${param.interval}`;
    console.log("✅ ",coin_chart_url)
    const fetch_response = await fetch(coin_chart_url);
    const result = await fetch_response.json();
    switch (param.days) {
      case '1':
        const update_day_1 = await Crypto.updateOne(
          { _id: "60f2e23890069202a073e800" },
          { $set: {chart_last_visited: Date.now()}}
        );
        console.log("✅  Last Update :", result.length);
        return response.json({ 
          message : result.error || 'Day - Success!' ,
          result,
          status: response.statusCode,
          query : param,
        });
        break;
      case '7':
        const update_day_7 = await Crypto.updateOne(
          { _id: "60f2e23890069202a073e800" },
          { $set: {chart_last_visited: Date.now()}}
        );
        console.log("✅  Last Update :", result.length);
        request.query.interval = 'hourly'
        return response.json({ 
          message : result.error || 'Week - Success!' ,
          result,
          status: response.statusCode,
          query : param,
        });
        break;
      case '30':
        const update_day_30 = await Crypto.updateOne(
          { _id: "60f2e23890069202a073e800" },
          { $set: {chart_last_visited: Date.now()} }
        );
        console.log("✅  Last Update :", result.length);
        return response.json({result});
        break;
      case '183':
        const update_day_183 = await Crypto.updateOne(
          { _id: "60f2e23890069202a073e800" },
          { $set: {chart_last_visited: Date.now()} }
        );
        console.log("✅  Last Update :", result.length);
        return response.json({ 
          message : result.error || '6 Months - Success!' ,
          result,
          status: response.statusCode,
          query : param,
        });
        break;
      case '366':
        const update_day_366 = await Crypto.updateOne(
          { _id: "60f2e23890069202a073e800" },
          { $set: {chart_last_visited: Date.now()} }
        );
        console.log("✅  Last Update :", result.length);
        return response.json({ 
          message : result.error || 'Year - Success!' ,
          result,
          status: response.statusCode,
          query : param,
        });
        break;
      case 'max':
        const update_day_max = await Crypto.updateOne(
          { _id: "60f2e23890069202a073e800" },
          { $set: {chart_last_visited: Date.now()} }
        );
        console.log("✅  Last Update :", result.length);
        return response.json({ 
          message : result.error || 'Max - Success!' ,
          result,
          status: response.statusCode,
          query : param,
        });
        break;
      default :{
        console.log('Ops !!!')
        return response.json({
          url: `https://api.coingecko.com/api/v3/${param.head}/${param.coin}/${param.category}?${param.currency}&days=${param.days}&interval=${param.interval}`,
          query: param
        })}

    }


  }catch(error){
    console.warn(error)
  }
})

/** https://data.messari.io/api/v1/assets/${selectedItem.id}/profile
 * News api 
 * credits to https://newsapi.org/
 */
router.get("/news", async (request, response) => {
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
    const updatedNews = await Crypto.updateOne(
        { _id: "60f2e23890069202a073e800" },
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
});


router.get("/gnews/:head", async (request, response) => {
  try {
    const { q, country, sortby, lang } = request.query
    const param =  {
      head: request.params.head, //search or top-headlines
      query: q? `q=${q}`: '', // sample: bitcoin
      country: country? `&country=${country}`: '&country=ph', //date
      sortBy: sortby? `&sortby=${sortby}`: '', //publishedAt
      language: lang? `&lang=${lang}` : '&lang=en', //en
    }
    if(q) {
      response.status(200)
      const key =  q? process.env.REACT_APP_GNEWS_API_KEY : null
      const news_url =
      `https://gnews.io/api/v4/${param.head}?${param.query}${ param.country}${param.sortBy}${param.language}&token=${key}`;
      console.log( "✅ ",news_url)
      const fetch_response = await fetch(news_url);
      const news_data_v2 = await fetch_response.json();
      const updatedNews = await Crypto.updateOne(
          { _id: "60f2e23890069202a073e800" },
          { $set: {news_data_v2, updated_at : Date.now()} }
        );
      console.log("✅  News V2 | Last Update :", format(Date.now(), 'en_US'));
      return response.json({ 
        message : news_data_v2.errors || news_data_v2.message , 
        status: response.statusCode,
        counts: news_data_v2.articles.length,
        query: param,
        data_fetched : format(Date.now(), 'en_US')
      });
    }
    else {
      response.status(404)
      console.warn('🔸  The query parameters is required');
      return response.send({
        status: response.statusCode,
        message: '🏴󠁧󠁢󠁳󠁣󠁴󠁿  The query parameters is required',
        query: param,
        
      })
    }
   


  } catch (error) {
    console.log("🏴󠁧󠁢󠁳󠁣󠁴󠁿  Error on fetch" , error.message  ); 
  }
});

module.exports = router