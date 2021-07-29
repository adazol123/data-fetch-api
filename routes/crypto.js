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

const getCoins = async (type, category, per_page, currency, page, order, sparkline, price_change) => {
  const url = `https://api.coingecko.com/api/v3/${type}/${category}?vs_currency=${currency}${per_page}&sparkline=true&page=${page}`
  try {
    const response = await fetch(url)
    const data_coin =  await response.json()
    const [...rest] = data_coin
    return data_coin
  } catch (error) {
    console.log('Coin Error')
  }
}


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
      sparkline: sparkline? `&sparkline=${sparkline}`: '',
      price_change: price_change? `&price_change_percentage=${price_change}`: '', //price change percentage in 1h, 24h, 7d, 14d, 30d, 200d, 1y (eg. '1h,24h,7d' comma-separated,
      market_chart: `/market_chart`
    }
    const coin_v1_url =
    `https://api.coingecko.com/api/v3/${param.type}/${param.category}?vs_currency=${param.currency}${param.order}${param.per_page}${param.page}${param.sparkline}${param.price_change}`;
    console.log("✅ ",coin_v1_url)
    const fetch_response = await fetch(coin_v1_url);


    if(param.type === 'coins' &&  param.category === 'markets') {
      try {
        const coin_page_1 = getCoins(param.type, param.category, param.per_page, param.currency, 1)
        const coin_page_2 = getCoins(param.type, param.category, param.per_page, param.currency, 2)
        const coin_page_3 = getCoins(param.type, param.category, param.per_page, param.currency, 3)
        const result = await Promise.all([coin_page_1,coin_page_2,coin_page_3])
        const [[...one],[...two],[...three]] = result
        const coins_data = [...one,...two,...three]

        const updatedCrypto = await Crypto.updateOne(
          { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
          { $set: {coins_data, coins_updated_at : Date.now()} }
        );
        console.log("✅  Last Update :", coins_data.length);
        console.log(one.push(...two,...three))
        return response.json({ 
          message : 'success!' ,
          counts: (coins_data.length),
          status: response.statusCode,
          query : param,
  
        });
      } catch (error) {
        console.log('Coins_data fetch encountered an error ', error.message)
      }

    }

    if(param.type === 'search' &&  param.category === 'trending') {
      const coin_trends = await fetch_response.json();
      const updatedCrypto = await Crypto.updateOne(
        { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
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
          { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
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
          { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
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
          { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
          { $set: {chart_last_visited: Date.now()} }
        );
        console.log("✅  Last Update :", result.length);
        return response.json({result});
        break;
      case '183':
        const update_day_183 = await Crypto.updateOne(
          { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
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
          { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
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
          { _id: process.env.REACT_APP_MONGO_ATLAS_ID },
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




router.get('/coin/:coin', async (request, response) => {
  try {
    const param = {
      type: request.params.type,
      coin: request.params.coin,
      localization: request.query.localization? `?localization=${request.query.localization}` : '?localization=true'
    }
    const result = await Coin(param.coin, param.localization)
    typeof undefined === 'undefined'
    const coin_object = {
      coin: {  
        id: result[0].id,
        symbol: result[0].symbol,
        name: result[0].name,
        image: result[0].image,
        tagline: !result[1].data? null : result[1].data.tagline ,
        description: !result[1].data? result[0].description.en || null :  result[1].data.overview || result[0].description.en,
        category: !result[1].data? null : result[1].data.category,
        sector: !result[1].data? null : result[1].data.sector,
        token_details: {
          current_supply: !result[1].data? result[0].market_data.circulating_supply.toLocaleString() : result[1].data.token_distribution.current_supply,
          max_supply: !result[1].data? result[0].market_data.max_supply.toLocaleString() : result[1].data.token_details.max_supply,
          description: !result[1].data? null : result[1].data.token_distribution.description,
          usage: !result[1].data? null : result[1].data.token_details.usage,
          type: !result[1].data? null : result[1].data.token_details.type,
          mining_algorithm: !result[1].data? null : result[1].data.token_details.mining_algorithm,
          emission_type_general: !result[1].data? null : result[1].data.token_details.emission_type_general,
          emission_type_precise: !result[1].data? null : result[1].data.token_details.emission_type_precise,
          consensus_algorithm: !result[1].data? null : result[1].data.consensus_algorithm,
          relevant_resources: !result[1].data? null : result[1].data.relevant_resources
        },
        market_data: result[0].market_data,
        tickets: result[0].tickets,
        last_updated: result[0].last_updated,
        is_verified: !result[1].data? null : result[1].data.is_verified,
      }
    }
    console.log('✅  Coin search success!')
    return response.status(200).json(coin_object);

  } catch (error) {
    console.log("🏴󠁧󠁢󠁳󠁣󠁴󠁿  Error on fetch" , error.message  ); 
    return response.status(404).json({
      "error message": error.message
    })
  }
})



// fetch data per coin search
async function Coin(coin, localization) {
  geck_url = `https://api.coingecko.com/api/v3/coins/${coin}${localization}`
  mess_url =  `https://data.messari.io/api/v1/assets/${coin}/profile`
  console.log(geck_url)
  console.log(mess_url)
  try {
    let fetch_gecko = await fetch(geck_url)
    let response_gecko = fetch_gecko.json()
    let fetch_messa = await fetch(mess_url)
    let response_messa = fetch_messa.json()

    const result = await Promise.all([response_gecko,response_messa])

    console.log(' Dual fetch success!', [response_gecko, response_messa] )
    return result


  } catch (error) {
    console.log("🏴󠁧󠁢󠁳󠁣󠁴󠁿  Error on selected coin" , error.message ); 
  }

}




module.exports = router