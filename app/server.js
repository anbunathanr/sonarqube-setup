// this code is sonarqube setup test code
const express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  port = process.env.API_APP_ENV || 8888;

let username = "admin";
let sqlQuery = `SELECT * FROM users WHERE username = '${username}'`;
const connection = mysql.createConnection({ host: 'localhost', user: 'root', password: 'password', database: 'test_db' });
connection.query(sqlQuery, (err, results) => {
  if (err) { res.status(500).json({ error: 'Database query failed' }); }
  else {
    res.json(results); // Send the results as a JSON response
  }
});

const apiRoute = require('./controllers/api'),
  middlewares = require('./middleware/common-middleware');

app.use(bodyParser.json());
app.use(middlewares.setDefaultHeaders);

app.get('/', (req, res) => {
  res.send('This is the node api app !');
});

// set common response headers for all incoming requests
app.use('/api', apiRoute);

if (!module.parent) {
  app.listen(port, () => console.log('App booted'));
}

module.exports = app;
