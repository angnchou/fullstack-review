const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database");
const getReposByUsername = require("../helpers/github.js");

let app = express();

app.use(bodyParser.urlencoded()); //browser is urlencoded
app.use(express.static(__dirname + "/../client/dist"));

// url: http://localhost:8080/repos?foo=bar#sdf
// protocol: http
// hostname: localhost
// port: 8080
// path: repos
// query string: ?foo=bar&coco=cream,

app.post("/repos", function(req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let searchTerm = req.body.term;
  console.log(getReposByUsername["getReposByUsername"], "repo by username");
  // console.log(req.body.term, "req body term");
  res.send("SUCCESS!");

  getReposByUsername["getReposByUsername"](searchTerm);
});

app.get("/repos", function(req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});
