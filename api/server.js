const express = require('express');
const bodyParser = require('body-parser');
const apiRouter = require('./routes');

const app = express();

app.use(bodyParser.json());
app.use(apiRouter);

// Handle 404 (Not Found)
app.use((req, res) => {
  return res.status(404).send(`Route ${req.url} not found`);
});

// Handle 500 (Internal Server Error)
app.use((err, req, res, next) => {
  console.log(err);

  return res.status(500).send('Internal server error');
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log(`Server is running on port ${listener.address().port}`);
});
