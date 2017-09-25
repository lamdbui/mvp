var mongoose = require('mongoose');

const DATABASE = 'dogadoptus';
const SERVER = 'localhost';

mongoose.connect(`mongodb://${SERVER}/${DATABASE}`);

const petSchema = mongoose.Schema({
  name: String,
  availableStatus: Boolean,
  gender: String,
  age: Number,
  ageClass: String,
  photoUrls: Array,
  contactNameFirst: String,
  contactNameLast: String,
  contactAddress1: String,
  contactAddress2: String,
  contactCity: String,
  contactState: String,
  contactPostalCode: String,
  contactPhoneNumber: Number
});

var Pet = mongoose.model('Pet', petSchema);

var get = (callback) => {
  Pet.find().exec()
    .then(resolve => {
      console.log('Found pets:', resolve.length);
      callback(null, resolve);
    })
    .catch(reject => {
      console.log('Error finding pets:', reject);
      callback(reject, null);
    });
};

// assume input is premapped to schema
var save = (petsArray, callback) => {
  let saveAttemptCount = 0;
  let successfulSaves = 0;
  petsArray.forEach(pet => {
    let petModel = new Pet(pet);
    petModel.save((error, doc, numAffected) => {
      saveAttemptCount++;
      if (error) {
        console.log('Error saving pet:', error);
      } else {
        successfulSaves++;
        if (saveAttemptCount === petsArray.length) {
          callback(null, successfulSaves);
        }
      }
    });
  });
};

module.exports.Pet = Pet;
module.exports.save = save;
module.exports.get = get;
