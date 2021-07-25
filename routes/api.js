const express = require('express')
const router = express.Router()
const Crypto = require('../models/Crypto')

router.get('/', (request, response) => {
  response.send({ 
    Server: 'Entrepreneurs Portfolio', 
    Message: 'Welcome to API environment'
  })
})


router.get('/coins', async (request, response) => {
  try {
    const coins = await Crypto.find()
    const [{coins_data}] = coins
    console.log('🌐  Fetched - Coins:',response.statusCode)
    return response.status(200).json(coins_data)
  } catch (error) { return response.json({message: error})}
})

router.get('/trends', async (request, response) => {
  try {
    const coins = await Crypto.find()
    const [{coin_trends}] = coins
    console.log('🌐  Fetched - Trends:',response.statusCode)
    return response.json(coin_trends)
  } catch (error) { return response.json({message: error})}
})

router.get('/news', async (request, response) => {
  try {
    const coins = await Crypto.find()
    const [{news_data}] = coins
    console.log('🌐  Fetched - News V1:',response.statusCode)
    return response.status(200).json(news_data)
  } catch (error) { return response.json({message: error})}
})

router.get('/news-v2', async (request, response) => {
  try {
    const coins = await Crypto.find()
    const [{news_data_v2}] = coins
    console.log('🌐  Fetched - News V2:',response.statusCode)
    return response.status(200).json(news_data_v2)
  } catch (error) { return response.json({message: error})}
})



module.exports = router