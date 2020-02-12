var express =  require('express');
var router = express.Router();
var imgModel = require('./seguridad.model');

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

router.put('/users/upd/:id', (req, res)=>{
  var id = parseInt(req.params.id);
  var updImg = imgModel.update( id, req.body);
  return res.status(200).json(updImg);
});

router.delete('/users/del/:id', (req, res)=>{
  var id = parseInt(req.params.id);
  imgModel.deleteByCode(id);
  res.status(200).json({"deleted":true});
});

module.exports = router;
