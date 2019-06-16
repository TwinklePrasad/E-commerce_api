const mongoose = require('mongoose');

var ProductCategory = mongoose.model('ProductCategory', {
    name: { type: String },
    code: { type: String },
    description: { type: String },
});

module.exports = { ProductCategory };