var fs = require('fs');
var fileToSave = 'security.json';
var imgModel = {};
var imgCollection = [];

var imgTemplate = {
  imgID:'',
  imgTitle:"",
  imgUrlOriginal:"",
  imgUrlPreview:"",
  imbAlbum: ""
}

imgModel.getAll = ()=>{
  return imgCollection;
}

imgModel.getById = (id)=>{
  var filteredImgs = imgCollection.filter(
    (o)=>{
      return o.userID === id;
    }
  );
  if(filteredImgs.length){
    return filteredImgs[0];
  }else{
    return null
  }
}



module.exports = imgModel;
