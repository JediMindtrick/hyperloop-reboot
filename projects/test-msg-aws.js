//var AWS = require('aws-sdk');
var SQS = require('aws-sqs');

var fs = require('fs');
var path = require('path');
var _secretsFile = path.join(process.env.SECRETS_LOCATION,'secrets.json');

var secrets = JSON.parse(fs.readFileSync(_secretsFile, 'utf8'));

console.log("I've got a secret: " + JSON.stringify(secrets));

//AWS.config.update({accessKeyId: secrets.aws_access_key_id, secretAccessKey: secrets.aws_secret_access_key});

//var sqs = new AWS.SQS().client;

var sqs = new SQS(secrets.aws_access_key_id, secrets.aws_secret_access_key, { region: secrets.queue_region });

sqs.sendMessage(secrets.queue_name, JSON.stringify({foo:'bar'}),function(err,res){
  console.log('pushed a message to ' + secrets.queue_name);

  if(err) {
    //handle error
    console.log('looks like there was an error');
    console.log(JSON.stringify(err));
  }
  console.log(res); // something like /158795553855/testTimeoutQueue

});
/*
sqs.createQueue('testTimeoutQueue', {VisibilityTimeout : 120}, function(err, res) {
  if(err) {
    //handle error
  }
  console.log(res); // something like /158795553855/testTimeoutQueue
});
*/
