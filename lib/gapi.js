var googleapis = require('googleapis'),
    OAuth2Client = googleapis.OAuth2Client,
    client = '386137235540.apps.googleusercontent.com',
    secret = 'fhDauxg0rQu7SzbbSaPGife7',
    redirect = 'http://localhost:3000/oauth2callback',
    calendar_auth_url = '',
    oauth2Client = new OAuth2Client(client, secret, redirect);

calendar_auth_url = oauth2Client.generateAuthUrl({
  access_type: 'offline',
  scope: 'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile https://www.googleapis.com/auth/calendar'
});

var callback = function(clients) {
  exports.cal = clients.calendar;
  exports.oauth = clients.oauth2;
  exports.client = oauth2Client;
  exports.url = calendar_auth_url;
};

googleapis
  .discover('calendar', 'v3')
  .discover('oauth2', 'v2')
  .execute(function(err, client){
    if(!err)
      callback(client);
  });

exports.ping = function() {
    console.log('pong');
};
