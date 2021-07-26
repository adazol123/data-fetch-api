/**
 * Models should be uppercase
 */
const mongoose = require('mongoose')

const CryptoSchema = mongoose.Schema({
  coin_data_v1: Object,
  coin_data_v2: Object,
  coins_data: Object,
  coin_trends: Object,
  coin_day_1: Object,
  coin_day_7: Object,
  coin_day_30: Object,
  coin_day_183: Object,
  coin_day_366: Object,
  chart_last_visited: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  },
  coins_updated_at: {
    type: Date,
    default: Date.now
  },
},{collection: 'root'})

module.exports = mongoose.model('crypto', CryptoSchema)