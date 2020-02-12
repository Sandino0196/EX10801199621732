var express =  require('express');
var router = express.Router();
var userModel = require('./seguridad.model');

router.get('/users/all', (req, res)=>{
    return res.status(200).json(imgModel.getAll());
} );

router.get('/users/:id',(req, res)=>{
    var id = parseInt( req.params.id );
    var img = imgModel.getById(id);
    return res.status(200).json(user);
});

router.post('/users/new', (req, res)=>{
  var datosEnviados = req.body;
  var newImg = imgModel.addNew(datosEnviados);
  return res.status(200).json(newImg);
});

module.exports = router;
