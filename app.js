var express = require('express'),
    app = express(),
    request = require('request'),
    path = require('path'),
    gapi = require('./lib/gapi'),
    http = require('http');

var my_profile = {},
    my_email = '';

var code = '';
var token = {};


function isEmptyObject(obj) {
  return !Object.keys(obj).length;
}

app.get('/', function(req, res) {
  var locals = {
        title: 'Login with Google',
        url: gapi.url
      };
  res.render('index.jade', locals);
});

app.get('/oauth2callback', function(req, res) {
  if (code == '') {
  	  code = req.query.code;
  }
  console.log(code);
  	gapi.client.getToken(code, function(err, tokens){
  	if (isEmptyObject(token)) {
    	gapi.client.credentials = tokens;
    	token = tokens;
    	console.log(token);
    }
    getData(res);
  	});
});

app.get('/profile', function(req, res){
  var locals = {
    title: "This is your profile",
    user: my_profile.name,
    picture: my_profile.picture,
    email: my_email
  };
  res.render('profile.jade', locals);
});

var getData = function(res) {
  gapi.oauth.userinfo.get().withAuthClient(gapi.client).execute(function(err, results){
      console.log(results);
      my_email = results.email;
      my_profile.name = results.name;
      my_profile.picture = results.picture;
	  getTrustedTicket(res);

  });
};

var getTrustedTicket = function(res) {
	request.post(
		'http://10.211.55.5:8000/trusted/',
		{form: {username: 'admin'}},
		function(error, response, body){
			if (!error && response.statusCode == 200) {
            	console.log("Ticket: " + body);
            	var locals = {
					title: "Welcome " + my_profile.name,
					user: my_profile.name,
					picture: my_profile.picture,
					email: my_email,
					tabServerUrl: "http://10.211.55.5:8000/trusted/" + body + "/views" 
	   			};
            	res.render('profile.jade', locals);
        	}
		}
	);
}

app.use(express.static(__dirname + '/css'));
app.use(express.static(__dirname + '/img'));

var server = app.listen(3000);

console.log('Express server started on port %s', server.address().port);