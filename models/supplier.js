const mongoose = require('mongoose');

var  Supplier = mongoose.model('Supplier', {
    
    name: { type: String },
    bussiness_name: { type: String },
    email: { type: String },
    phone: { type: String },
    address: { type: String },
    
});

module.exports = { Supplier };