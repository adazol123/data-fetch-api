const express = require("express");
const GetDatabase = require("../dababase/connect-crypto");
const router = express.Router();
const Crypto = require("../models/Crypto");
const News = require("../models/News");

router.get("/", (request, response) => {
  response.send({
    Server: "Entrepreneurs Portfolio",
    Message: "Welcome to API environment",
  });
});

router.get("/coins", async (request, response) => {
  try {
    const coins = await Crypto.find();
    const [{ coins_data }] = coins;
    console.log("🌐  Fetched - Coins:", response.statusCode);
    return response.status(200).json({ result: coins_data });
  } catch (error) {
    return response.json({ message: error });
  }
});

router.get("/trends", async (request, response) => {
  try {
    const coins = await Crypto.find();
    const [{ coin_trends }] = coins;
    console.log("🌐  Fetched - Trends:", response.statusCode);
    return response.json({result: coin_trends});
  } catch (error) {
    return response.json({ message: error });
  }
});

router.get("/news", async (request, response) => {
  try {
    const news = await News.find();
    const [{ news_data }] = news;
    console.log("🌐  Fetched - News:", response.statusCode);
    return response.status(200).json({ result: news_data });
  } catch (error) {
    return response.json({ message: error });
  }
});

module.exports = router;
