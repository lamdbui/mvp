var mongoose = require('mongoose');

const DATABASE = 'dogadoptus';
const SERVER = 'localhost';

mongoose.connect(`mongodb://${SERVER}/${DATABASE}`);

const petSchema = mongoose.Schema({
  name: String,
  availableStatus: String,
  gender: String,
  age: Number,
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
