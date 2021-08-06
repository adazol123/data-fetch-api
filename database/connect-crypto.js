const mongoose = require("mongoose");
let URI = process.env.REACT_APP_MONGO_ATLAS_URI
let db;

const GetDatabase = async () => {
  if (!db) {
    console.log("🔛  Initializing Connection...");
    try {
      const client = await mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        user: process.env.REACT_APP_MONGO_ATLAS_USER,
        pass: process.env.REACT_APP_MONGO_ATLAS_PW,
        dbName: process.env.REACT_APP_MONGO_ATLAS_DB,
      });
      db = client;
      console.log("🆗  Connected Successfully | Database:",
        process.env.REACT_APP_MONGO_ATLAS_DB
      );
    } catch (error) {
      console.log("😥  MongoDB Error:", error.message);
    }
  }
  return db;
};

module.exports = GetDatabase;
