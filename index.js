const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
 
const { mongoose } = require('./db.js');
var employeeController = require('./controllers/employeeController.js');
var productCategoryController = require('./controllers/ProductCategoryController.js');
var productController = require('./controllers/productController.js');
var supplierController = require('./controllers/supplierController.js');
var userController = require('./controllers/userController.js');
 
var app = express();
app.use(bodyParser.json()); 
app.use(cors({ origin: 'http://localhost:4200' }));

app.listen(3000, () => console.log('Server started at port : 3000'));

app.use('/myimages',express.static('./attach'));
app.use('/employees', employeeController);
app.use('/category', productCategoryController);
app.use('/product', productController);
app.use('/supplier', supplierController);
app.use('/api', userController);
 