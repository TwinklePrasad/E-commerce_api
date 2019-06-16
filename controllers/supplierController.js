const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Supplier } = require('../models/Supplier');

// => localhost:3000/Suppliers/
router.get('/', (req, res) => {
    Supplier.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Suppliers :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Supplier.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Supplier :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/', (req, res) => {
    var  pro = new Supplier({
       
        name: req.body.name,
        bussiness_name: req.body.bussiness_name,
        email: req.body.email,
        phone: req.body.phone,
        address: req.body.address,
         
    });
     pro.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Supplier Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.put('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var  pro = {
       
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quality: req.body.quality,
        code: req.body. code,
        supplier: req.body.supplier
    };
    Supplier.findByIdAndUpdate(req.params.id, { $set:  pro }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Supplier Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Supplier.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Supplier Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;