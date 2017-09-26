const request = require('request');
const querystring = require('querystring');
const database = require('../database');
const petModel = database.Pet;

const LOG_TAG = 'PETFINDER';

// const testPet = {
//     "options": {
//         "option": [
//             {
//                 "$t": "hasShots"
//             },
//             {
//                 "$t": "noDogs"
//             },
//             {
//                 "$t": "noKids"
//             },
//             {
//                 "$t": "altered"
//             },
//             {
//                 "$t": "noCats"
//             },
//             {
//                 "$t": "housetrained"
//             }
//         ]
//     },
//     "status": {
//         "$t": "A"
//     },
//     "contact": {
//         "phone": {
//             "$t": "(415) 587-1121 "
//         },
//         "state": {
//             "$t": "CA"
//         },
//         "address2": {},
//         "email": {
//             "$t": "info@gratefuldogsrescue.org"
//         },
//         "city": {
//             "$t": "San Francisco"
//         },
//         "zip": {
//             "$t": "94141"
//         },
//         "fax": {},
//         "address1": {
//             "$t": "PO Box 411013"
//         }
//     },
//     "age": {
//         "$t": "Young"
//     },
//     "size": {
//         "$t": "L"
//     },
//     "media": {
//         "photos": {
//             "photo": [
//                 {
//                     "@size": "pnt",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/1/?bust=1472262524&width=60&-pnt.jpg",
//                     "@id": "1"
//                 },
//                 {
//                     "@size": "fpm",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/1/?bust=1472262524&width=95&-fpm.jpg",
//                     "@id": "1"
//                 },
//                 {
//                     "@size": "x",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/1/?bust=1472262524&width=500&-x.jpg",
//                     "@id": "1"
//                 },
//                 {
//                     "@size": "pn",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/1/?bust=1472262524&width=300&-pn.jpg",
//                     "@id": "1"
//                 },
//                 {
//                     "@size": "t",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/1/?bust=1472262524&width=50&-t.jpg",
//                     "@id": "1"
//                 },
//                 {
//                     "@size": "pnt",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/2/?bust=1472262525&width=60&-pnt.jpg",
//                     "@id": "2"
//                 },
//                 {
//                     "@size": "fpm",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/2/?bust=1472262525&width=95&-fpm.jpg",
//                     "@id": "2"
//                 },
//                 {
//                     "@size": "x",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/2/?bust=1472262525&width=500&-x.jpg",
//                     "@id": "2"
//                 },
//                 {
//                     "@size": "pn",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/2/?bust=1472262525&width=300&-pn.jpg",
//                     "@id": "2"
//                 },
//                 {
//                     "@size": "t",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/2/?bust=1472262525&width=50&-t.jpg",
//                     "@id": "2"
//                 },
//                 {
//                     "@size": "pnt",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/3/?bust=1472262525&width=60&-pnt.jpg",
//                     "@id": "3"
//                 },
//                 {
//                     "@size": "fpm",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/3/?bust=1472262525&width=95&-fpm.jpg",
//                     "@id": "3"
//                 },
//                 {
//                     "@size": "x",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/3/?bust=1472262525&width=500&-x.jpg",
//                     "@id": "3"
//                 },
//                 {
//                     "@size": "pn",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/3/?bust=1472262525&width=300&-pn.jpg",
//                     "@id": "3"
//                 },
//                 {
//                     "@size": "t",
//                     "$t": "http://photos.petfinder.com/photos/pets/36067682/3/?bust=1472262525&width=50&-t.jpg",
//                     "@id": "3"
//                 }
//             ]
//         }
//     },
//     "id": {
//         "$t": "36067682"
//     },
//     "shelterPetId": {
//         "$t": "Courtesy"
//     },
//     "breeds": {
//         "breed": {
//             "$t": "Pit Bull Terrier"
//         }
//     },
//     "name": {
//         "$t": "Skye"
//     },
//     "sex": {
//         "$t": "F"
//     },
//     "description": {
//         "$t": "*** This is a courtesy posting.  We have not met or evaluated this dog.  Please see contact info at the end of this writeup. ***\n\nSkye is a gorgeous 2 year old Pitbull Terrier. She was abandoned by her family in a high kill shelter in Southern CA because they were moving. Skye is a 65 pound lap dog, she loves to snuggle, give kisses, chase butterflies, play fetch and go on long walks or runs (she would be a great running partner). \n\nSkye is dog selective which means she likes some dogs and not others so she would probably be best as an only pet. She is very sweet, but large and active so we recommend no children younger than 10 years old. No cats. Skye spent a very long time in the shelter and is still young so she will need some training. \n\nSkye is spayed, microchipped, vaccinated and ready for her forever home.  If you are interested in meeting Skye or would like to find out more about her, please contact Adrienne at a_ledden@yahoo.com"
//     },
//     "mix": {
//         "$t": "yes"
//     },
//     "shelterId": {
//         "$t": "CA792"
//     },
//     "lastUpdate": {
//         "$t": "2017-06-09T14:00:06Z"
//     },
//     "animal": {
//         "$t": "Dog"
//     }
// };

// exampleData.petfinder.pets.pet (ARRAY of PETS)
// pd.exampleData.petfinder.pets.pet[1].media.photos.photo

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

  // console.log('*ID:', jsonPetResponse.id);
  // console.log('*ID2:', jsonPetResponse.id[DEFAULT_PETFINDER_KEY]);

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
    contactPhoneNumber: (jsonPetResponse.contact && jsonPetResponse.contact.phone) ? jsonPetResponse.contact.phone[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING,
    contactEmail: (jsonPetResponse.contact && jsonPetResponse.contact.email) ? jsonPetResponse.contact.email[DEFAULT_PETFINDER_KEY] : DEFAULT_STRING
  };

  return modelMap;
};

module.exports.getPets = getPets;
module.exports.mapRequestToPetDatabaseModel = mapRequestToPetDatabaseModel;
// module.exports.testPet = testPet;
