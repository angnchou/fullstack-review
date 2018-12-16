const request = require("request");
const config = require("../config.js");

let getReposByUsername = (searchTerm, callback) => {
  // TODO - Use the request module to request repos for a specific
  // user from the github API

  // The options object has been provided to help you out,
  // but you'll have to fill in the URL
  //https://developer.github.com/v3/

  let options = {
    url: `https://api.github.com/users/${searchTerm}/repos`,
    headers: {
      "User-Agent": "angnchou",
      Authorization: `token ${config.TOKEN}`
    }
  };
  //github API returns json data, need to parse and send back to server
  //https://www.npmjs.com/package/request custom HTTP header
  request(options, (err, response, body) => {
    if (!err && response.statusCode === 200) {
      callback(null, JSON.parse(body));
    } else if (err) {
      callback(err, null);
    } else {
      callback(
        {
          message: "Non-200 response from github",
          status: response.statusCode
        },
        null
      );
    }
  });
};

module.exports.getReposByUsername = getReposByUsername;
