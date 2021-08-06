require("dotenv").config()
const express = require("express")
const bodyParser = require("body-parser")
const app = express()
const port = process.env.PORT || "8000"
const cors = require("cors")
const path = require("path")
const cryptoRoute = require("./routes/crypto");
const newsRoute = require('./routes/news');
const apiRoute = require("./routes/api");
const cryptoRouteV2 = require("./routes/cryptoV2")
const GetDatabase = require('./database/connect-crypto')



const heartbeat = () =>
  setInterval(() => {
    return console.log(
      "💓  heartbeat!",
      process.env.REACT_APP_MONGO_ATLAS_DB || "no connection"
    );
  }, (6000 * 30));

heartbeat();

//MIDDLEWARES
app.use(cors(), bodyParser.json());

//ROUTES
app.use("/api/backend", cryptoRoute);
app.use("/api/backend/news", newsRoute)
app.use("/api/v2", cryptoRouteV2);
app.use("/api", apiRoute);


//ROOT
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("*", (request, response) => {
    response.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}


GetDatabase().then(() => {
  app.listen(port, () => console.log("👷  Application launched at PORT:", port));
})
