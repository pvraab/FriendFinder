var friendData = require("../data/friendData");

// Routing
module.exports = function (app) {

  // Get friends
  app.get("/api/friends", function (req, res) {
    res.json(friendData);
  });

  // Post friends
  app.post("/api/friends", function (req, res) {
    friendData.push(req.body);
    res.json(true);
  });

  // Clear friend data
  app.post("/api/clear", function (req, res) {
    // Empty out the arrays of data
    friendData.length = 0;
    res.json({
      ok: true
    });
  });
};