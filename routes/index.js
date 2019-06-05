var express = require('express');
var router = express.Router();

var velos = [
  {model : "Bike 1",price : 200,quantity : 0,image : "../images/bike-1.jpg"},
  {model : "Bike 2",price : 300,quantity : 0,image : "../images/bike-2.jpg"},
  {model : "Bike 3",price : 400,quantity : 0,image : "../images/bike-3.jpg"},
  {model : "Bike 4",price : 350,quantity : 0,image : "../images/bike-4.jpg"},
  {model : "Bike 5",price : 450,quantity : 0,image : "../images/bike-5.jpg"},
  {model : "Bike 6",price : 250,quantity : 0,image : "../images/bike-6.jpg"}
  ];

  var boughtBike = [
    {model : "Bike 3",price : 400,quantity : 2,image : "../images/bike-3.jpg"},
    {model : "Bike 4",price : 350,quantity : 1,image : "../images/bike-4.jpg"}
  ]

  /*var totalPriceUnit = boughtBike.quantity * boughtBike.price;*/



/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title :"produits",velos }
  );
});

router.get('/shop', function(req, res, next) {
  res.render('shop', { title :'shop',boughtBike }
  );
});

module.exports = router;
