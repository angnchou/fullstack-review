const request = require("request");
const config = require("../config.js");

let getReposByUsername = searchTerm => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL

  let options = {
    url: `https://api.github.com/users/${searchTerm}/repos`,
    headers: {
      "User-Agent": "angnchou",
      Authorization: `token ${config.TOKEN}`
    }
  };

  let callback = (err, response, body) => {
    if (!err && response.statusCode === 200) {
      let stars = body[stargazers_count];
      console.log(
        JSON.parse(stars),
        "Successfully queried Github using helper!"
      );
    } else {
      console.log(err, "ERROR");
      console.log(response.statusCode, "ERR STATUScode");
      console.log(JSON.parse(body), "body from helper");
    }
  };
  request(options, callback);
};

module.exports.getReposByUsername = getReposByUsername;
