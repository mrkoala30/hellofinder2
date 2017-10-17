var express = require('express');
var router = express.Router();
var request = require('request');
var cheerio = require('cheerio');
var dateFormat = require('dateformat');
var config = require('../resources/config.js');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send({'test':'test'});
});

router.get('/', function(req, res, next) {
  res.send({'test':'test'});
});

router.post('/page', function(req, res, next) {
  //console.log(req.body.page);
  if(req.body.page!=undefined){
    request(req.body.page, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
            }
            //console.log(body);
            if(body!=undefined){
              var $ = cheerio.load(body);

              $('#content-category').filter(function(){
                  var peliculas = [];
                  var data = $(this);
                  // var ul = document.getElementById("foo");
                  var li = data.find( "li" );
                  //    console.log(li[0].children[1].children[1].children[3].children[3].children[0].data)
                  for (var i = 0; i < li.length; ++i) {
                      var calidad = "";
                      var tamano = "";
                      var capitulo = "";
                      var pelicula = null;
                      for(var u = 0;u<7; u=u+2){
                          var text = li[i].children[1].children[1].children[3].children[3].children[u].data;

                          if(text.search("Calidad:")!=-1){
                              calidad = text.slice(text.search("Calidad:")+8,text.length);
                          }
                          if(text.search("Temp")!=-1){
                              capitulo = text.slice(text.search("Temp"),text.length);
                          }
                          if(text.search("ño:")!=-1){
                              tamano = text.slice(text.search("ño:")+3,text.length);
                          }
                      }
                      var name = li[i].children[1].children[1].children[3].children[1].children[0].data;
                      if(capitulo == ""){
                          pelicula = {
                              titulo: name,
                              img : li[i].children[1].children[1].children[1].attribs.src,
                              enlace : li[i].children[1].attribs.href,
                              calidad: calidad,
                              tamano: tamano,
                              torrent: " "
                          };
                      }else{
                          pelicula = {
                              titulo: name,
                              capitulo: capitulo,
                              img : li[i].children[1].children[1].children[1].attribs.src,
                              enlace : li[i].children[1].attribs.href,
                              calidad: calidad,
                              tamano: tamano,
                              torrent: " "
                          };
                      }
                      if(pelicula!=null){
                          peliculas.push(pelicula);
                      }

                  }
                  res.json({'items':peliculas});
              });
            }
        });
  }
});

router.post('/item', function(req, res, next) {
  var trailer = "";
  var torrent = "";
  if(req.body.url!=undefined){
    console.log(req.body.url);
    request(req.body.url, function(error, response, body) {
            if(error) {
                console.log("Error: " + error);
            }
            if(body!=undefined){
              var $ = cheerio.load(body);

                  $('.external-url').filter(function(){
                      var data = $(this);
                      torrent = data[0].attribs.href;
                  });

                  $('#content-trailer').filter(function(){
                      var data = $(this);
                      if(typeof data[0].children[1].children[1].children[1] != "undefined" && typeof data[0].children[1].children[1].children[1].children[3] != "undefined"){
                        trailer = data[0].children[1].children[1].children[1].children[3].attribs.src;
                      }
                  });
            }
            res.send({name:torrent,youtube:trailer});
    });
  }else{
    res.json({name:"",youtube:""});
  }
});

module.exports = router;
