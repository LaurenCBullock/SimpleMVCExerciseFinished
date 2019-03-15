// require mongoose, a popular MongoDB library for nodejs
const mongoose = require('mongoose');

// Promise that it will recieve data at some point
mongoose.Promise = global.Promise;

// variable to hold our Model
let DogModel = {};

// define datastructure for database
const DogSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },

  breed: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },


  age: {
    type: Number,
    min: 0,
    required: true,
  },

  createdData: {
    type: Date,
    default: Date.now,
  },

});

// Every static function
// only exists once and is called.
DogSchema.statics.sayName = (dog) => {
  console.log(dog.name);
};

// These are used when you want a public function you can call to do a task,
// not a method that uses or returns instance variables
// That is, these are used when you don't need an object, just a function to call.
DogSchema.statics.findByName = (name, callback) => {
  const search = {
    name,
  };

  return DogModel.findOne(search, callback);
};

// Create the Dog model based on the schema. You provide it with a custom discriminator
// (the name of the object type. Can be anything)
// and the schema to make a model from.
// Look at the model variable definition above for more details.
DogModel = mongoose.model('Dog', DogSchema);


// export our public properties
module.exports.DogModel = DogModel;
module.exports.DogSchema = DogSchema;
