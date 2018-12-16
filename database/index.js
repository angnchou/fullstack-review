const mongoose = require("mongoose");
require("mongoose-type-url");
mongoose.connect("mongodb://localhost/fetcher");
//define schema, create model,
//create an instance of the model


//use starr_url to store stars of all repos in database, show top 25
let repoSchema = mongoose.Schema({
  // TODO: your schema here!

  name: { type: String, unique: true }, //login/repo name
  url: { type: mongoose.SchemaTypes.Url, unique: true }, //{}
  stars: Number //stargazers_count
});

const Repo = mongoose.model("Repo", repoSchema);

//server calls saveRepos to insert docuemnt to db
const saveRepos = (repos, callback) => {
  // This function should save a repo or repos to db
  // check if records already exist to maintain unique entries

  //.exec() .then()  https://mongoosejs.com/docs/promises.html
  /*this returns an array of promise for each repo  
  const repoPromises =
    repos.map((repo) => {
      return Repo.find({ name: repo.name }).exec().then((docs) => {
        if (docs.length === 0) {
          return Repo.save(repo).exec();
        } else {
          return null;
        }
      })
    });

  //promise to resolve after all prev promises; .then() takes two functions as arguments for data and err
  Promise.all(repoPromises)
    .then((data) => callback(null, data), (err) => { callback(err) });
};
*/
  Repo.insertMany(repos, err => {
    if (!err) {
      callback(null);
    } else {
      callback(err);
    }
  });
};

//query db for top 25 starred repos to display when the page loads
const findTop25 = callback => {
  Repo.find()
    .sort({ stars: -1 })
    .limit(25)
    //this callback sends error and data back
    .exec(callback);
};

module.exports.saveRepos = saveRepos;
module.exports.findTop25 = findTop25;
