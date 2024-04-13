const { log } = require('console');
var express = require('express');
var router = express.Router();
const fs = require("fs");
const path = require("path");
const upload = path.join(__dirname,"../","public","upload")
// console.log(upload);

/* GET home page. */
router.get('/', function(req, res, next) {
  const files = fs.readdirSync(upload);
  res.render('index',{files:files,filedata:"",filename:""});
});
router.get('/file/:filename', function(req, res, next) {
  const {filename} = req.params
  const files = fs.readdirSync(upload);
  const filedata = fs.readFileSync(path.join(upload,filename),"utf8");
  res.render('index',{files:files,filedata:filedata,filename:filename});
});
router.get('/delete/:filename', function(req, res, next) {
  const {filename} = req.params;
fs.unlinkSync(path.join(upload,filename),"");
  res.redirect("/")

});

router.post("/create",function(req,res){
  const {filename}=req.body
  fs.writeFileSync(path.join(upload,filename),"")
  res.redirect(`/file/${filename}`);
})
router.post("/update/:filename",function(req,res){
  const {filename}=req.params;
  const {filedata}=req.body;
  console.log(filename);
  fs.writeFileSync(path.join(upload,filename),filedata);
  res.redirect(`/file/${filename}`);
})
module.exports = router;
