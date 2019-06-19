// Require express
var express = require("express");

// Use an express server 
var app = express();

// Set the port
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Load api and html routes
require("./app/routing/apiRoutes")(app);
require("./app/routing/htmlRoutes")(app);

// Start the listener
app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
