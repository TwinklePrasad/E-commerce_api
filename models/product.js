const mongoose = require('mongoose');

var  Product = mongoose.model('Product', {
    
    name: { type: String },
    category: { type: String },
    price: { type: String },
    quality: { type: String },
    code: { type: String },
    supplier: { type: String },
    image: String,
    cur_date:{
        type:Date,
        default:Date.now()
    }
});

module.exports = { Product };