## Tableau Trusted Ticket App for Google Authentication

Steps to get up and running:

1. Install node.js (https://nodejs.org/)
2. Fork this repo
3. Setup trusted authentication for Tableau Server: http://onlinehelp.tableau.com/current/server/en-us/trusted_auth_trustIP.htm
4. Start Tableau Server
5. Edit the "getTrustedTicket" method in app.js with URLs to your Tableau Server
6. Enter "node app.js" from the root of your local copy of this repo
7. Open a browser and go to http://<your laptop>:3000
8. Click on the button to login with Google
 