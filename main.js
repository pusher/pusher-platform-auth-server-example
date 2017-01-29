const http = require('http');
const jwt = require('jwt-simple');
const server = http.createServer((req, res) => {
  var body = [];
  req.on('error', function(err) {
    console.error(err);
  }).on('data', function(chunk) {
    body.push(chunk);
  }).on('end', function() {
    body = Buffer.concat(body).toString();
    // TODO body should be form data
    var bodyJson;
    try { bodyJson = JSON.parse(body); } catch (e) {}
    res.writeHead(200, {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    });
    const currentTimeUnixSecs = Math.floor(Date.now() / 1000);
    const issuedAtUnixSecs = currentTimeUnixSecs - 60; // Margin of error for clocks being slightly out of sync
    let userId = (bodyJson ? bodyJson.userId : null) || "jim";
    res.end(JSON.stringify({
      "access_token": jwt.encode({
        "iat": issuedAtUnixSecs,
        "exp": issuedAtUnixSecs + (60 * 60 * 24),
        "iss": "keys/" + "cfabdc6f-c256-4a93-be36-c2a945eb1253",
        "app": "2efb721e-090b-4eda-bc2c-f6c1311208f6",
        "sub": userId
      }, "Io263YG8mt3GCTH7Cr9j1vCUTpmmqFkFbeDL+ZEsg2M=")
    }));
  });
});
server.listen(process.env.PORT, '0.0.0.0', () => {
  console.log("Listening");
});
