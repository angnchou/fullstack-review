const mongoose = require("mongoose");
require("mongoose-type-url");
mongoose.connect("mongodb://localhost/fetchshow der");
//define schema, create model,
//create an instance of the model
//.save, .find ...

//use starr_url to store stars of all repos in database, show top 25
let repoSchema = mongoose.Schema({
  // TODO: your schema here!

  full_name: { type: String, unique: true }, //login/repo name
  repos_url: mongoose.SchemaTypes.Url, //inside {owners: {}}
  stars: Number //stargazers_count
});

const Repo = mongoose.model("Repo", repoSchema);

// let newRepo = new Repo({
//   full_name: "",
//   repos_url: "https://mongoosejs.com/docs/models.html#compiling",
//   stars: ""
// });

let save = (err, data) => {
  // TODO: Your code here
  // This function should save a repo or repos to
  // the MongoDB
  if (err) return handleError(err);
};

module.exports.save = save;
// repo.save(function(err) {
//   if (err) {
//     console.log(err, "ERR SAVE");
//   } else {
//     Repo.find(function(err, response) {
//       response.forEach(r => {
//         r.name = "Dana";
//         r.save();
//       });
//       console.log(response, "respons from FIND");
//       console.log(err, "error");
//     });
//   }
// });
