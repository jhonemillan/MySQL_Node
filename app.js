var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var logger = require('morgan');
var cors = require('cors');
var mysql = require('mysql');
var app = express();
var port = process.env.PORT || 3000;

//configuracion de la conexion, podria ir en un archivo diferente.
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'admin',
    database : 'test'
  });
   

app.use(logger('dev'));
app.use(bodyParser.urlencoded({ extended: false })); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(cors());

//view engine, que motor html se usa
app.set('view engine','html');

//rsponse por defectom cuando se accede a una ruta no manejada
app.get('/',function(req, res){
    console.log('entra al get');
    res.sendFile(path.join(__dirname,'index.html'));
});

//Se agrego por heroku
app.get('/favicon.ico', function(req, res) {
    res.status(204);
});

//una ruta cuaquiera
app.get('/countries', function(req, res) {
   //No se llama el metodo connect, porque al acceder al metodo query, el connect esta implicito 
   connection.query('select idcountry, name,continent,surfacearea,population from country', function (error, rows, fields) {
     if (error) throw error;    
     res.send(rows);    
    });
});

app.post('/add', function(req, res){
    let result;
    let query = `insert into country (idcountry, name, continent, surfacearea, population) 
                values(${req.body.idcountry}, '${req.body.name}','${req.body.continent}',${req.body.surfacearea}, ${req.body.population})
                on duplicate key update
                continent = '${req.body.continent}',
                name = '${req.body.name}',
                surfacearea = ${req.body.surfacearea},
                population = ${req.body.population}  `
    connection.query(query, {
        idcountry: req.body.idcountry,
        name: req.body.name,
        continent: req.body.continent,
        surfacearea: req.body.surfacearea,
        population: req.body.population
    }
        , function (error, results, fields) {
        if (error) throw error;
        console.log(results.insertId);
        result = results;
      });

      res.json(result);
});

app.delete('/delete/:idcountry', function(req, res){
    console.log(req.params.idcountry);
    connection.query('DELETE FROM country WHERE idcountry = ' + req.params.idcountry, function (error, results, fields) {
        if (error) throw error;
        res.json(results);
      })
})
  
//Puerto del server
app.listen(port,()=>{
    console.log('listening on port ' + port);
})