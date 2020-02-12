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
      return o.userID === id;
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
  newImg.userID = imgCollection.length + 1;

  imgCollection.push(newImg);
  writeToFile();
  return newImg;
}

module.exports = imgModel;
