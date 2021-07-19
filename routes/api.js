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
    const [{coin_data_v1}] = coins
    console.log('Coin Trends:',response.statusCode)
    return response.json(coin_data_v1)
  } catch (error) { return response.json({message: error})}
})

router.get('/trends', async (request, response) => {
  try {
    const coins = await Crypto.find()
    const [{coin_trends}] = coins
    console.log('Coin Trends:',response.statusCode)
    return response.json(coin_trends)
  } catch (error) { return response.json({message: error})}
})

router.get('/news', async (request, response) => {
  try {
    const coins = await Crypto.find()
    const [{news_data}] = coins
    console.log('News V1:',response.statusCode)
    return response.json(news_data)
  } catch (error) { return response.json({message: error})}
})

router.get('/news-v2', async (request, response) => {
  try {
    const coins = await Crypto.find()
    const [{news_data_v2}] = coins
    console.log('News V1:',response.statusCode)
    return response.json(news_data_v2)
  } catch (error) { return response.json({message: error})}
})



module.exports = router