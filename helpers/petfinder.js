const request = require('request');
const querystring = require('querystring');
const database = require('../database');
const petModel = database.Pet;

const LOG_TAG = 'PETFINDER';

const defaults = {
  BASE_URL: 'http://api.petfinder.com/',
  ROUTE: 'pet.find',
  OUTPUT_TYPE: 'basic', // can also be 'full'
  FORMAT: 'json',
  COUNT: 50,
  LOCATION: 'san francisco, ca'
};

// valid configuration options
// {
//   output:   // 'basic' || 'full'
//   format:   // 'json' || 'xml'
//   count:    // Integer
//   location: // postalCode or city (e.g. 92612 or 'san francisco, ca')
// }

var getPets = (options = {}) => {
  return new Promise((resolve, reject) => {
    let queryOptions = {
      'key': process.env.PETFINDER_API_KEY, // TODO: Think of what to do for default here
      'output': options.output || defaults.OUTPUT_TYPE,
      'location': options.location || defaults.LOCATION,
      'count': options.count || defaults.COUNT,
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

// works on the array returned to us from the Petfinder API
// exampleData.petfinder.pets.pet
var mapRequestToPetsModelArray = jsonPetsResponse => {
  let mappedPetsModelsArr = jsonPetsResponse.map(singleJsonPetResponse => {
    return mapRequestToPetDatabaseModel(singleJsonPetResponse);
  }, []);
  return mappedPetsModelsArr;
};

// TODO: Maybe think of a better place to put this or do this
var mapRequestToPetDatabaseModel = jsonPetResponse => {
  // petfinder uses this key, not sure why...
  const DEFAULT_PETFINDER_KEY = '$t';

  // TODO: This should really be defined on the database side
  const DEFAULT_NUMBER = -1;
  const DEFAULT_STRING = '';

  let jsonPetResponseBreeds = (jsonPetResponse.breeds && jsonPetResponse.breeds.breed) ? jsonPetResponse.breeds.breed : [];
  // breeds.breed can be an array or an object, so we turn it into an Array for consistency when parsing data
  if (!Array.isArray(jsonPetResponseBreeds)) {
    jsonPetResponseBreeds = [jsonPetResponseBreeds];
  }
  let mappedBreedsArr = jsonPetResponseBreeds.map(breed => {
    return breed[DEFAULT_PETFINDER_KEY];
  }, []);

  let jsonPetResponsePhotos = (jsonPetResponse.media && jsonPetResponse.media.photos && jsonPetResponse.media.photos.photo) ?
    jsonPetResponse.media.photos.photo : [];
  let mappedPhotosArr = jsonPetResponsePhotos.map(photo => {
    return photo[DEFAULT_PETFINDER_KEY];
  }, []);


  // TODO: We should probably trim whitespace to keep things consistent
  let modelMap = {
    petId: (jsonPetResponse.id) ? parseInt(jsonPetResponse.id[DEFAULT_PETFINDER_KEY]) : DEFAULT_NUMBER,
    name: (jsonPetResponse.name) ? jsonPetResponse.name[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    description: (jsonPetResponse.description) ? jsonPetResponse.description[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    availableStatus: (jsonPetResponse.status) ? jsonPetResponse.status[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    breed: mappedBreedsArr,
    mix: (jsonPetResponse.mix && jsonPetResponse.mix[DEFAULT_PETFINDER_KEY] && jsonPetResponse.mix[DEFAULT_PETFINDER_KEY].toLowerCase().charAt(0) === 'y') ?
      true : false,
    size: (jsonPetResponse.size) ? jsonPetResponse.size[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    sex: (jsonPetResponse.sex) ? jsonPetResponse.sex[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    age: DEFAULT_NUMBER,      // currently no numerical age available in API
    ageClass: (jsonPetResponse.age) ? jsonPetResponse.age[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    photoUrls: mappedPhotosArr,
    isFavorite: false,  // TODO: Make this our own later
    shelterId: (jsonPetResponse.shelterId) ? jsonPetResponse.shelterId[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    shelterPetId: (jsonPetResponse.shelterPetId) ? jsonPetResponse.shelterPetId[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    contactNameFirst: DEFAULT_STRING, // currently no contact name available in API
    contactNameLast: DEFAULT_STRING,  // currently no contact name available in API
    contactAddress1: (jsonPetResponse.contact && jsonPetResponse.contact.address1) ? jsonPetResponse.contact.address1[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    contactAddress2: (jsonPetResponse.contact && jsonPetResponse.contact.address2) ? jsonPetResponse.contact.address2[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    contactCity: (jsonPetResponse.contact && jsonPetResponse.contact.city) ? jsonPetResponse.contact.city[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    contactState: DEFAULT_STRING,     // currently no State info available in API
    contactPostalCode: (jsonPetResponse.contact && jsonPetResponse.contact.zip) ? jsonPetResponse.contact.zip[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    contactPhoneNumber: (jsonPetResponse.contact && jsonPetResponse.contact.phone) ? jsonPetResponse.contact.phone[DEFAULT_PETFINDER_KEY].trim() : DEFAULT_STRING,
    contactEmail: (jsonPetResponse.contact && jsonPetResponse.contact.email) ? jsonPetResponse.contact.email[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING
  };

  return modelMap;
};

module.exports.getPets = getPets;
module.exports.mapRequestToPetDatabaseModel = mapRequestToPetDatabaseModel;
module.exports.mapRequestToPetsModelArray = mapRequestToPetsModelArray;
