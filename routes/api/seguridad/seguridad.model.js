var fs = require('fs');
var fileToSave = 'security.json';
var imgModel = {};
var imgCollection = [];

function writeToFile(){
  var serializedJSON = JSON.stringify(imgCollection);
  fs.writeFileSync(fileToSave, serializedJSON, { encoding: 'utf8' } );
  return true;
}
function openFile(){
  try{
  var serializedJSON = fs.readFileSync(fileToSave,{encoding:'utf8'});
  imgCollection = JSON.parse(serializedJSON);
  } catch(e){
    console.log(e);
  }
}

var imgTemplate = {
  imgID:'',
  imgTitle:"",
  imgUrlOriginal:"",
  imgUrlPreview:"",
  imgAlbum: ""
}

openFile();

imgModel.getAll = ()=>{
  return imgCollection;
}

imgModel.getById = (id)=>{
  var filteredImgs = imgCollection.filter(
    (o)=>{
      return o.imgID === id;
    }
  );
  if(filteredImgs.length){
    return filteredImgs[0];
  }else{
    return null
  }
}

imgModel.addNew = ({ imgtitle, imgurloriginal, imgurlpreview, imgalbum }  )=>{
  var newImg = Object.assign(
    {},
    imgTemplate,
    {
      imgTitle: imgtitle,
      imgUrlOriginal: imgurloriginal,
      imgUrlPreview: imgurlpreview,
      imgAlbum: imgalbum
    }
  );
  newImg.imgID = imgCollection.length + 1;

  imgCollection.push(newImg);
  writeToFile();
  return newImg;
}

imgModel.update = (id, { imgurloriginal, imgurlpreview })=>{
 var updatingImg = imgCollection.filter(
   (o, i)=>{
     return o.imgID === id;
   }
 );
 if(updatingImg && updatingImg.length>0){
   updatingImg = updatingImg[0];
 } else {
   return null;
 }
 var updateImg = {};
 var newUpdatedCollection = imgCollection.map(
   (o, i)=>{
     if(o.imgID === id){
       updateImg = Object.assign({},
          o,
         { imgUrlOriginal: imgurloriginal, imgUrlPreview:imgurlpreview}
       );
       return updateImg;
     }else{
       return o;
     }
   }
 );
  imgCollection = newUpdatedCollection;
  writeToFile();
  return updateImg;
}

imgModel.deleteByCode = (id)=>{
  var newCollection = [];
  newCollection = imgCollection.filter(
    (o)=>{
      return o.userID !== id;
    }
  );
  imgCollection = newCollection;
  writeToFile();
  return true;
}

module.exports = imgModel;
