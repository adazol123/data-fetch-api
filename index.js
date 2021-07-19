const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 8000;
const cors = require("cors");
const mongoose = require("mongoose");
const path = require('path')
const uri = `mongodb+srv://${process.env.REACT_APP_MONGO_ATLAS_USER}:${process.env.REACT_APP_MONGO_ATLAS_PW}@cluster0.vddsv.mongodb.net/${process.env.REACT_APP_MONGO_ATLAS_DB}?retryWrites=true&w=majority`;
const cryptoRoute = require('./routes/crypto')
const apiRoute = require('./routes/api')

//MIDDLEWARES
app.use(cors(), bodyParser.json(), (req, res, next) => {
  console.log("🔐  Middleware: cors & body-parser");   
  next();
});
// app.use(bodyParser.json(), (req, res, next) => {
//   console.log("🔐  middleware: body parser");
//   next();
// });

const Schema = mongoose.Schema;
mongoose.connect(
  uri,{ useNewUrlParser: true, useUnifiedTopology: true },
  () => {console.log("🆗  Database Connected!")},
);

//ROUTES
app.use('/api/backend', cryptoRoute)
app.use('/api', apiRoute)

//ROOT
// app.get('/', (request, response) => {
//   response.send({ 
//     Server: 'Development Environment', 
//     Message: 'Welcome to Entrepreneurs Portfolio'
//   })
// })

const heartbeat = () => setInterval(() => {
  return console.log('💓  heartbeat!', process.env.REACT_APP_MONGO_ATLAS_USER)
},6000)

heartbeat()

if(process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
  // app.get('*', (request, response) => {
  //   response.sendFile(path.join(__dirname, 'client/build', 'index.html'))
  // })
}

app.listen(port, () =>
  console.log("👷  Listening to PORT:", port),
);
