var express = require('express');
// using express Router
var router = express.Router();

router.get('/', function(req, res, next){
 //   res.send('INDEX PAGE'); // to output a string
    res.render('index.html'); // To render a Page
});

module.exports = router;