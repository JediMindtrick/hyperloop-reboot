var express = require('express');
var fs = require('fs');
var path = require('path');
var _cfgFile = path.join(process.env.CONFIG_LOCATION,'box_config.json');

var cfg = JSON.parse(fs.readFileSync(_cfgFile, 'utf8'));

var app = express();

app.get('/', function(req, res){
    res.send('Hello from inside a container!');
});

app.listen(cfg.webPort);
console.log('listening on ' + cfg.webPort);
