# pusher-platform-example-authorizer

This is an example auth server for [the pusher-platform example app](https://pusher.github.io/pusher-platform-js/example.html). It is [running on Heroku](https://platform-example-authorizer.herokuapp.com/). To run it yourself:

```
$ npm install
$ PORT=3000 node main.js
Listening
```

You can then query the server:

```
$ curl 'http://localhost:3000/pusherplatform/authorize' --data 'grant_type=client_credentials&credentials=jim'
{"access_token":"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE0ODgyOTg3MzgsImV4cCI6MTQ4ODM4NTEzOCwiaXNzIjoia2V5cy9jZmFiZGM2Zi1jMjU2LTRhOTMtYmUzNi1jMmE5NDVlYjEyNTMiLCJhcHAiOiIyZWZiNzIxZS0wOTBiLTRlZGEtYmMyYy1mNmMxMzExMjA4ZjYiLCJzdWIiOiJqaW0ifQ.s0A7Iav9_uNnnwEa22cVvXFCaKfrHDxZ_qa-4fv85Co"}
```
