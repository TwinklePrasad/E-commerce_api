const express = require('express');
var router = express.Router();
var ObjectId = require('mongoose').Types.ObjectId;

var { Product } = require('../models/product');

const multer=require('multer');
let DIR='../attach';
//for file upload with multer
let storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null,DIR)
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+ '.' + file.originalname.split('.')[file.originalname.split('.').length -1])
    }
  })
  
  let upload = multer({ storage: storage }).single('Image');




// => localhost:3000/Products/
router.get('/', (req, res) => {
    Product.find((err, docs) => {
        if (!err) { res.send(docs); }
        else { console.log('Error in Retriving Products :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Product.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Product :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.post('/',   (req, res) => {
     
    var  pro = new Product({
       
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quality: req.body.quality,
        code: req.body. code,
        image:req.body.image,
        supplier: req.body.supplier
    });
     pro.save((err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Product Save :' + JSON.stringify(err, undefined, 2)); }
    });
});

// router.post('/',function(req,res)
// {
//    upload(req,res,function(err)
//       {
//              if(err)
//              {}
//              else
//              {
//                let name= req.body.name,
//                   category= req.body.category,
//               price= req.body.price,
//                   quality = req.body.quality,
//                    code= req.body.code,
//                    fname=req.file.filename;
//                    supplier= req.body.supplier
//                  pro=new Product({'name':name,'category':category,'price':price,'quality':quality,'code':code,'supplier':supplier,'image':fname});
//                  pro.save(function(err)
//                 {
//                     if(err){}
//                     else
//                     {
//                         res.json({'err':0,'msg':'category save'})
//                     }
//                 })
//              }
//       })
// })

router.put('/:id',(req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).sendNo(` record with given id : ${req.params.id}`);

    var  pro = {
       
        name: req.body.name,
        category: req.body.category,
        price: req.body.price,
        quality: req.body.quality,
        code: req.body. code,
        image:req.body.image,
        supplier: req.body.supplier
    };
    Product.findByIdAndUpdate(req.params.id, { $set:  pro }, { new: true }, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Product Update :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.delete('/:id', (req, res) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Product.findByIdAndRemove(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Product Delete :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;