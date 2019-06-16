var friendData = require("../data/friendData");

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
    res.json(match);
  });

  function checkForMatch(friendObj) {
    var match = {
      name: "",
      photo: "",
      score: ""
    };

    // Initialize value to check for cosmic closeness
    var minVals = 100000;
    friendData.forEach(function (elem) {
      var compVals = 0;
      elem.scores.forEach(function (score, index) {
        compVals = parseInt(compVals) + Math.abs(parseInt(score) - parseInt(friendObj.scores[index]));
      });
      if (compVals < minVals) {
        match.name = elem.name;
        match.photo = elem.photo;
        match.score = compVals;
        minVals = compVals;
      }
    });
    return match;
  };

  // Clear friend data
  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friendData.length = 0;
    res.json({
      ok: true
    });
  });
};