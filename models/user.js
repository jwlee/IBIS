var mongoose = require('mongoose');

// Define our beer schema
var UserSchema   = new mongoose.Schema({

  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  firstName: String,
  lastName: String,
  age: Number,
  club: String,
  size: String,
  gender: String,
  phone: String,
  single: {
    entry: { type: Boolean, default: false },
    level: String
  },
  double: {
    entry: { type: Boolean, default: false },
    firstName: { type: String, lowercase: true },
    lastName: { type: String, lowercase: true },
    level: String
  },
  mixed: {
    entry: { type: Boolean, default: false },
    firstName: { type: String, lowercase: true },
    lastName: { type: String, lowercase: true },
    level: String
  },
  motified_at: {
    type: Date,
    default: Date.now
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  note : String

});

// Export the Mongoose model
module.exports = mongoose.model('User', UserSchema);
