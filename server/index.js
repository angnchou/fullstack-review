const express = require("express");
const bodyParser = require("body-parser");
const db = require("../database");
const getReposByUsername = require("../helpers/github.js").getReposByUsername;

let app = express();

app.use(bodyParser.urlencoded()); //browser is urlencoded
app.use(express.static(__dirname + "/../client/dist"));

// url: http://localhost:8080/repos?foo=bar#sdf
// protocol: http
// hostname: localhost
// port: 8080
// path: repos
// query string: ?foo=bar&coco=cream,

const transformApiData = array => {
  console.log(array[0]);
  return array.map(repo => {
    return {
      name: repo["full_name"],
      url: repo["svn_url"],
      stars: repo["stargazers_count"]
    };
  });
};

const transformDbData = array =>
  array.map(repo => ({
    name: repo.name,
    url: repo.url,
    stars: repo.stars
  }));

app.post("/repos", function (req, res) {
  // TODO - your code here!
  // This route should take the github username provided
  // and get the repo information from the github API, then
  // save the repo information in the database
  let searchTerm = req.body.term;
  // console.log(req.body.term, "req body term");

  getReposByUsername(searchTerm, (err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
    } else {
      const apiData = transformApiData(data);
      //TODO check number of repos from username
      console.log(apiData.length, "Number of repos from API");

      db.saveRepos(apiData, err => {
        if (err) {
          res.status(500).send(JSON.stringify(err));
        } else {
          res.send("SUCCESS!");
        }
      });
    }
  });
});

//when client loads the page, server queries db to get top25 repos
app.get("/repos", function (req, res) {
  // TODO - your code here!
  // This route should send back the top 25 repos
  db.findTop25((err, data) => {
    if (err) {
      res.status(500).send(JSON.stringify(err));
    } else {
      res.send(JSON.stringify(transformDbData(data)));
    }
  });
});

let port = 1128;

app.listen(port, function () {
  console.log(`listening on port ${port}`);
});
