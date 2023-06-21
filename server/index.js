const express = require("express");
const bodyParser = require("body-parser"); /* deprecated */
const cors = require("cors");
const routes = require('./routes');

var corsOptions = {
  origin: "http://localhost:4200"
};

const app = express();
// app.use(cors(corsOptions));
app.use(cors());
app.use(express.static('./public'));

app.use(express.json({ limit: '100MB' })); /* bodyParser.json() is deprecated */
app.use(express.urlencoded({ extended: true ,limit: '100mb'})); /* bodyParser.urlencoded() is deprecated */
app.use(routes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
