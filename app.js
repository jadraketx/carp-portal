require('dotenv').config()
const express = require('express');
const proxy = require('express-http-proxy');
const history = require('connect-history-api-fallback');
const path = require('path');
const helmet = require('helmet');

const port = process.env.VITE_PORT;
const app = express();

app.use(express.json())
app.use(express.urlencoded())

// enable history, always rewire to index.html
app.use(history({
  verbose: true
}))

// specify directory of the static webpages (bundle.js, index.html)
const staticPath = path.join(__dirname, 'build')
app.use(express.static(staticPath));

// hide info telling it is an express app, to avoid express-specified attack
app.disable('x-powered-by');

// set up HTTP headers properly
app.use(helmet());

// start http application
app.listen(port, '0.0.0.0', function onStart(err) {
  if (err) {
    console.log(err);
  }
  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});
