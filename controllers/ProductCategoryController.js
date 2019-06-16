const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { ProductCategory } = require('../models/product_category');

// => localhost:3000/ProductCategorys/
router.get('/', (req, res) => {
    ProductCategory.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving ProductCategorys :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    ProductCategory.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving ProductCategory :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var category= new ProductCategory({
       
        name: req.body.name,
        code: req.body.code,
        description: req.body.description,
       
    });
    category.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ProductCategory Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var category= {
       
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        state: req.body.state,
        address: req.body. address,
    };
    ProductCategory.findByIdAndUpdate(req.params.id, { $set: category}, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ProductCategory Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    ProductCategory.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in ProductCategory Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;