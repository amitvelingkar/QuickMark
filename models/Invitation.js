const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const validator = require('validator');

const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');

const invitationSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: 'Account',
    required: 'You must supply an account!'
  },
  role: {
    // 1 = account owner, 5 = admin, 10=member
    type: Number,
    min: 1,
    max: 10
  },
  invitationToken: String,
  invitationExpires: Date
});


module.exports = mongoose.model('Invitation', invitationSchema);
