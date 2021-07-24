require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || "8000";
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const uri =
  process.env.MONGO_URI ||
  `mongodb+srv://${process.env.REACT_APP_MONGO_ATLAS_USER}:${process.env.REACT_APP_MONGO_ATLAS_PW}@cluster0.vddsv.mongodb.net/${process.env.REACT_APP_MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
const cryptoRoute = require("./routes/crypto");
const apiRoute = require("./routes/api");

const Schema = async () => {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(
      "🆗  Database Connected!",
      process.env.REACT_APP_MONGO_ATLAS_DB
    );
  } catch (error) {
    console.log("😥  MongoDB Error:", error.message);
  }
};

const heartbeat = () =>
  setInterval(() => {
    return console.log(
      "💓  heartbeat!",
      process.env.REACT_APP_MONGO_ATLAS_DB || "no connection"
    );
  }, 6000);

Schema();
heartbeat();

//MIDDLEWARES
app.use(cors(), bodyParser.json(), (req, res, next) => {
  console.log("🔐  Middleware: cors & body-parser");
  next();
});

//ROUTES
app.use("/api/backend", cryptoRoute);
app.use("/api", apiRoute);

//ROOT
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (request, response) => {
    response.sendFile(path.join(__dirname, "client/build", "index.html"));
  });
}
// app.get('/', (request, response) => {
//   response.send({
//     Server: 'Development Environment',
//     Message: 'Welcome to Entrepreneurs Portfolio'
//   })
// })

app.listen(port, () => console.log("👷  Listening to PORT:", port));
