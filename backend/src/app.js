const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

const corsOptions = {
  origin: '*' // Replace with your allowed origin
};
app.use(cors(corsOptions));
app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
	res.send('Hello World');
});

module.exports = app
