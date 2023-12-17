var express = require('express');
var router = express.Router();
const fs = require('fs');

const foldername = "files";

router.get('/', function (req, res) {
  fs.readdir(`./${foldername}`, {withFileTypes: true}, function(err, files){
    res.render("index", {foldername, files});
  })
});

router.get('/bringback', function (req, res) {
  res.redirect('back');
});

router.get('/filecreate', function (req, res) {
  fs.writeFile(`./${foldername}/${req.query.file}`, "", function (err){
    res.redirect("/");
  })
});

router.get('/foldercreate', function (req, res) {
  fs.mkdir(`./${foldername}/${req.query.folder}`, function (err){
    res.redirect("/");
  })
});

router.post('/filesave/:filename', function (req, res) {
  fs.writeFile(`./${foldername}/${req.params.filename}`, req.body.filedata, function(err){
    res.redirect("back");
  })
});

router.get('/delete/file/:filename', function (req, res) {
  fs.unlink(`./${foldername}/${req.params.filename}`, function(err){
    res.redirect("/");
  })
});

router.get('/update/:filename', function (req, res) {
  fs.rename(`./${foldername}/${req.params.filename}`, `./${foldername}/${req.query.updated}`, function(err){
    res.redirect("/");
  })
});

router.get('/file/:filename', function (req, res) {
  fs.readdir(`./${foldername}`, {withFileTypes: true}, function(err, files){
    fs.readFile(`./${foldername}/${req.params.filename}`, "utf8", function(err, data){
      res.render("fileopened", {foldername, files, filename: req.params.filename, filedata: data});
    })
  })
});

router.get('/delete/folder/:filename', function (req, res) {
  fs.rmdir(`./${foldername}/${req.params.filename}`, function(err){
    res.redirect("/");
  })
});

module.exports = router;