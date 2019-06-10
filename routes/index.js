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

  const stripe = require('stripe')('sk_test_8QgSbCzAZzlfPvNWnfpXAKuj005dzO2H0j');
  


  /*var totalPriceUnit = boughtBike.quantity * boughtBike.price;*/

  

/* GET home page. */
router.get('/', function(req, res, next) {

  if(req.session.boughtBike == undefined){
    req.session.boughtBike = [];
  }
  
  res.render('index', { title :"produits", velos, boughtBike:req.session.boughtBike}
  );
});

router.post('/', function(req, res, next) {
  /*for(i=0;i<boughtBike.length;i++){
    if(boughtBike[i].model != req.body){
      boughtBike.push(req.body);
    };
  };*/

  var mustbeUpdated = false;
  for (var i = 0; i < req.session.boughtBike.length; i++) {
    if (req.body.model == req.session.boughtBike[i].model) {
       mustbeUpdated = true;
       req.session.boughtBike.quantity++
    }
  }
  if (mustbeUpdated == false) {

    req.session.boughtBike.push(
       {
          model: req.body.model,
          price: req.body.price,
          image: req.body.image,
          quantity: req.body.quantity
       }
     );
  }

  res.render('index', { title :"produits",velos, boughtBike : req.session.boughtBike }
  );
});

router.get('/shop', function(req, res, next) {

  res.render('shop', { title :'shop',boughtBike : req.session.boughtBike}
  );
});

router.post('/update', function(req, res, next) {
 
  if (req.body.quantity == 0) {
      req.session.boughtBike.splice(req.body.position, 1);
  } else {
    req.session.boughtBike[req.body.position].quantity = req.body.quantity;
  }


  res.render('shop', { title :'shop',boughtBike : req.session.boughtBike}
  );
});


router.get('/deleteitem', function(req, res, next) {
    var positionItem = req.query.position;
    var positionItemNext = positionItem + 1;
    req.session.boughtBike.splice(positionItem,1);

  res.render('shop', { title :'shop',boughtBike : req.session.boughtBike}
  );
  
});

router.post('/checkout', function(req, res, next) {

  var totalPrice = 0;
  for(i=0; i<req.session.boughtBike.length;i++){
    var totalPriceUnit = req.session.boughtBike[i].quantity * req.session.boughtBike[i].price;
    totalPrice = totalPrice + totalPriceUnit;
  }


  const charge = stripe.charges.create({
    amount: totalPrice*100,
    currency: 'eur',
    description: 'Bravo vous avez acheté ces vélos : ', 
    source: req.body.stripeToken,
  });

  req.session.boughtBike = [];


res.render('paiement', { title :'shop',boughtBike : req.session.boughtBike}
);

});



module.exports = router;
