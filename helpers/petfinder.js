const request = require('request');
const querystring = require('querystring');
const database = require('../database');
const petModel = database.Pet;

const LOG_TAG = 'PETFINDER';

// exampleData.petfinder.pets.pet (ARRAY of PETS)

const defaults = {
  BASE_URL: 'http://api.petfinder.com/',
  ROUTE: 'pet.find',
  OUTPUT_TYPE: 'basic', // can also be 'full'
  FORMAT: 'json',
  LOCATION: 'san francisco, ca'
};

// valid configuration options
// {
//   output:   // 'basic' || 'full'
//   format:   // 'json' || 'xml'
//   location: // postalCode or city (e.g. 92612 or 'san francisco, ca')
// }

var getPets = (options = {}) => {
  return new Promise((resolve, reject) => {
    let queryOptions = {
      'key': process.env.PETFINDER_API_KEY, // TODO: Think of what to do for default here
      'output': options.output || defaults.OUTPUT_TYPE,
      'location': options.location || defaults.LOCATION,
      'format': options.format || defaults.FORMAT
    }
    let resultQueryString = querystring.stringify(queryOptions);

    console.log(`[${LOG_TAG}] query: ${defaults.BASE_URL}/${defaults.ROUTE}?${resultQueryString}`);

    request.get(`${defaults.BASE_URL}/${defaults.ROUTE}?${resultQueryString}`, (error, response, body) => {
      if (error) {
        console.log(`[${LOG_TAG}] GET failure : ${error}`);
        reject(error);
      } else {
        console.log(`[${LOG_TAG}] GET data received: ${response}`);
        resolve(response);
      }
    });
  });
}

// TODO: Maybe think of a better place to put this or do this
var mapRequestToPetDatabaseModel = jsonPetResponse => {
  // petId: Number,
  // name: String,
  // description: String,
  // availableStatus: Boolean,
  // breed: String,
  // mix: Boolean,
  // size: String,             // 'S' || 'M' || 'L'
  // gender: String,           // 'M' || 'F'
  // age: Number,
  // ageClass: String,
  // photoUrls: Array,
  // isFavorite: Boolean,
  // shelterId: String,
  // shelterPetId: Number,
  // contactNameFirst: String,
  // contactNameLast: String,
  // contactAddress1: String,
  // contactAddress2: String,
  // contactCity: String,
  // contactState: String,
  // contactPostalCode: String,
  // contactPhoneNumber: Number,
  // contactEmail: String

  // petfinder uses this key, not sure why...
  const DEFAULT_PETFINDER_KEY = '$t';

  let modelMap = {
    petId: (jsonPetResponse.id) ? jsonPetResponse.id.DEFAULT_PETFINDER_KEY : -1,
    name: String,
    description: String,
    availableStatus: Boolean,
    breed: String,
    mix: Boolean,
    size: String,             // 'S' || 'M' || 'L'
    gender: String,           // 'M' || 'F'
    age: Number,
    ageClass: String,
    photoUrls: Array,
    isFavorite: Boolean,
    shelterId: String,
    shelterPetId: Number,
    contactNameFirst: String,
    contactNameLast: String,
    contactAddress1: String,
    contactAddress2: String,
    contactCity: String,
    contactState: String,
    contactPostalCode: String,
    contactPhoneNumber: Number,
    contactEmail: String
  };

  return modelMap;
};

module.exports.getPets = getPets;
