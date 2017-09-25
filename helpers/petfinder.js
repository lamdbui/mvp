// const $ = require('jquery');
const request = require('request');
const querystring = require('querystring');

const LOG_TAG = 'PETFINDER';

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
        resolve(response)
      }
    });
    // let requestOptions = {
    //   method: 'GET',
    //   url: `${defaults.BASE_URL}/?${resultQueryString}`,
    //   success: data => {
    //     console.log(`[${LOG_TAG}] GET data received: ${data}`);
    //     resolve(data);
    //   },
    //   failure: error => {
    //     console.log(`[${LOG_TAG}] GET failure : ${error}`);
    //     reject(error);
    //   }
    // };
    //$.ajax(requestOptions)
      // .done(data => {
      //   console.log(`[${LOG_TAG}] data received: ${data}`);
      //   resolve(data);
      // })
      // .fail();
  });
}

module.exports.getPets = getPets;
