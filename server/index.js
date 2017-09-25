const express = require('express');
const database = require('../database');
const petfinder = require('../data/petfinder');
const app = express();

const PORT = process.env.PORT || 3333;

app.get('/', (request, response) => {
  response.send('Yay a response!');
});

app.get('/pets', (request, response) => {
  console.log('ATTEMPTING TO GET /pets');
  petfinder.getPets()
    .then(resolve => {
      console.log('GET RESOLVE /pets:', resolve.length);
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
