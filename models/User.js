const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const md5 = require('md5');
const validator = require('validator');
const mValidator = require('mongoose-validator');

const mongodbErrorHandler = require('mongoose-mongodb-errors');
const passportLocalMongoose = require('passport-local-mongoose');


const usernameValidator = [
  mValidator({
    validator: 'isLength',
    arguments: [3, 15],
    message: 'UserName should be between {ARGS[0]} and {ARGS[1]} characters',
  }),
  mValidator({
    validator: 'isAlphanumeric',
    passIfEmpty: true,
    message: 'UserName should contain alpha-numeric characters only',
  }),
 ];

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, 'Invalid Email Address'],
    required: 'Please Supply an email address'
  },
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true
  },
  username: {
    type: String,
    unique: true,
    required: 'Please supply a unique user name',
    validate: usernameValidator,
    trim: true
  },
  resetPasswordToken: String,
  resetPasswordExpires: Date,
  hearts: [
    { type: mongoose.Schema.ObjectId, ref: 'Store' }
  ]
});

userSchema.virtual('gravatar').get(function() {
  const hash = md5(this.email);
  return `https://gravatar.com/avatar/${hash}?s=200`;
});

userSchema.plugin(passportLocalMongoose, { usernameField: 'email' });
userSchema.plugin(mongodbErrorHandler);

module.exports = mongoose.model('User', userSchema);
