var express =  require('express');
var router = express.Router();
var userModel = require('./seguridad.model');

router.get('/users/all', (req, res)=>{
    return res.status(200).json(imgModel.getAll());
} ); // get users/all

// http://localhost:3000/api/seguridad/users/1
router.get('/users/:id',(req, res)=>{
    var id = parseInt( req.params.id );
    var img = imgModel.getById(id);
    return res.status(200).json(user);
});
