const http = require('http');
const qs = require('querystring');
const jwt = require('jwt-simple');

const server = http.createServer((req, res) => {
  var body = [];
  req.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    if (req.method === "OPTIONS") {
      res.writeHead(200, { 'Access-Control-Allow-Origin': '*' });
      res.end();
    } else {
      body = Buffer.concat(body).toString();

      // body should be form data
      var bodyForm = qs.parse(body);

      if (bodyForm.grant_type !== "client_credentials") {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({"error": "expected 'grant_type=client_credentials' in request form data (other grant types not supported)"}));
      } else {
        const currentTimeUnixSecs = Math.floor(Date.now() / 1000);
        const issuedAtUnixSecs = currentTimeUnixSecs - 60; // Margin of error for clocks being slightly out of sync

        if (!bodyForm.credentials) {
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({"error": "expected 'credentials' key in request form data (set this to your username; I'm very insecure!)"}));
        } else {
          let userId = bodyForm.credentials;

          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({
            "access_token": jwt.encode(
              {
                "iat": issuedAtUnixSecs,
                "exp": issuedAtUnixSecs + (60 * 60 * 24),
                "iss": "keys/" + "cfabdc6f-c256-4a93-be36-c2a945eb1253",
                "app": "2efb721e-090b-4eda-bc2c-f6c1311208f6",
                "sub": userId
              },
              "Io263YG8mt3GCTH7Cr9j1vCUTpmmqFkFbeDL+ZEsg2M="
            )
          }));
        }
      }
    }
  });
});
server.listen(process.env.PORT, '0.0.0.0', () => {
  console.log("Listening");
});
