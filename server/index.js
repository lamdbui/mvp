const express = require('express');
const database = require('../database');
const petfinder = require('../helpers/petfinder');
const app = express();

const PORT = process.env.PORT || 3333;

app.get('/', (request, response) => {
  response.send('Yay a response!');
});

app.get('/pets', (request, response) => {
  console.log('ATTEMPTING TO GET /pets');
  petfinder.getPets()
    .then(resolve => {
      // TODO: resolve is a string, so need to JSON.parse it
      console.log('GET RESOLVE /pets:', resolve);
      response.status(200).send(resolve);
    })
    .catch(reject => {
      console.log('GET REJECT /pets:', reject);
      response.status(400).send(reject);
    });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
