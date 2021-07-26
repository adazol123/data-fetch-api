const mongoose = require('mongoose')

const NewsSchema = mongoose.Schema({
    news_data : Object,
    news_data_v2: Object,
    updated_at: {
        type:Date,
        default: Date.now
    },
    news_updated_at: {
        type:Date,
        default: Date.now
    }
}, {collection: 'root'})

module.exports = mongoose.model('news', NewsSchema)