const express = require('express');
const database = require('../database');
const petfinder = require('../helpers/petfinder');
// const bodyparser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 3333;

// app.use(bodyparser.json());
// app.use(bodyparser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/../'));

app.get('/pets', (request, response) => {
  console.log('ATTEMPTING TO GET /pets');
  petfinder.getPets()
    .then(resolve => {
      let petsResolve = JSON.parse(resolve.body);
      let pets = petsResolve.petfinder.pets.pet;
      // console.log('GET RESOLVE /pets:', pets);
      let mappedPetsModelsArr = petfinder.mapRequestToPetsModelArray(pets);
      response.status(200).send(mappedPetsModelsArr);
    })
    .catch(reject => {
      // console.log('GET REJECT /pets:', reject);
      response.status(400).send([]);
    });
});

app.get('/favorites', (request, response) => {
  console.log('GET /favorites');
  database.get((error, data) => {
    if (error) {
      response.status(400).send([]);
    } else {
      console.log('GET /favorites DATA:', data);
      response.status(200).send(data);
    }
  });
});

app.post('/favorites', (request, response) => {
  console.log('POST /favorites:', request);

  request.on('data', (data) => {
    let petDataObj = JSON.parse(data);
    console.log('POST /favorites DATA:', petDataObj);
    // save our favorited object to the databases
    database.save([petDataObj], (error, numAffected) => {
      if (error) {
        response.status(400).send();
      } else {
        response.status(201).send();
      }
    });
  });
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
