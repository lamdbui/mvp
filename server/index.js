const express = require('express');
const database = require('../database');
const petfinder = require('../helpers/petfinder');
const app = express();

const PORT = process.env.PORT || 3333;

app.use(express.static(__dirname + '/../'));

app.get('/pets', (request, response) => {
  console.log('ATTEMPTING TO GET /pets');
  petfinder.getPets()
    .then(resolve => {
      let petsResolve = JSON.parse(resolve.body);
      let pets = petsResolve.petfinder.pets.pet;
      // console.log('GET RESOLVE /pets:', pets);
      let mappedPetsModelsArr = petfinder.mapRequestToPetsModelArray(pets);
      // console.log('*** MAPPED:', mappedPetsModelsArr);
      response.status(200).send(mappedPetsModelsArr);
      // response.status(200).send({});
    })
    .catch(reject => {
      // console.log('GET REJECT /pets:', reject);
      response.status(400).send([]);
    });
});

app.get('/favorites', (request, response) => {
  console.log('GET /favorites');
  response.status(200).send();
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
