var express = require('express');
var fs = require('fs');
var path = require('path');
var http = require('http');
reload = require('reload');
var bodyParser = require('body-parser');

var _cfgFile = path.join(process.env.CONFIG_LOCATION,'box_config.json');
var cfg = JSON.parse(fs.readFileSync(_cfgFile, 'utf8'));

var app = express();
//middleware
app.set('views', path.join(__dirname, 'spa'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded())
app.use(express.static(path.join(__dirname, 'spa')));
app.engine('html', require('ejs').renderFile);

//routes
app.get('/', function(req, res) {
  res.render('index.html');
});

//start
var server = app.listen(cfg.webPort);

//add live reload functionality
reload.all(server,app);
console.log('listening on ' + cfg.webPort);
