var friendData = require("../data/friends");

// Routing
module.exports = function (app) {

  // Get friends
  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });

  // Post friends
  app.post("/api/friends", function (req, res) {
    console.log("Post");
    var match = checkForMatch(req.body);
    console.log("Post");
    console.log(match);
    friendData.push(req.body);
    match = JSON.stringify(match);
    res.json(match);
  });

  // Check for a friend match
  // Compute difference function for answers and use the 
  // first absolute minimum difference
  function checkForMatch(friendObj) {

    // Initialize match object
    var match = {
      name: "",
      photo: "",
      score: ""
    };

    // Initialize value to check for cosmic closeness
    var minVals = 100000;

    // Loop through all possible friends
    friendData.forEach(function (elem) {
      var compVals = 0;

      // Compare all possible friends with this one
      elem.scores.forEach(function (score, index) {
        compVals = parseInt(compVals) + Math.abs(parseInt(score) - parseInt(friendObj.scores[index]));
      });

      // If current minimum, save it
      if (compVals < minVals) {
        match.name = elem.name;
        match.photo = elem.photo;
        match.score = compVals;
        minVals = compVals;
      }
    });

    // Return best match
    return match;
  };

};