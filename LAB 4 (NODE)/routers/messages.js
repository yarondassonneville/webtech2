var express = require('express');
var router = express.Router();
var controller = require('./../controllers/messages');

router.get('/', controller.getAll);
    
router.get('/:id', function(req, res){
    res.send("GET messages with id " + req.params.id);
});

router.post('/', controller.create);

router.put('/:id', function(req, res){
    res.send("PUT messages with id " + req.params.id);
});

router.delete('/:id', function(req, res){
    res.send("DELETE messages with id " + req.params.id);
});

module.exports = router;