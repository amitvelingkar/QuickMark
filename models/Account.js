const mongoose = require('mongoose');
const Schema = mongoose.Schema;
mongoose.Promise = global.Promise;
const slug = require('slugs');
const shortid = require('shortid');
const mValidator = require('mongoose-validator');

const nameValidator = [
  mValidator({
    validator: 'isLength',
    arguments: [3, 25],
    message: 'Name should be between {ARGS[0]} and {ARGS[1]} characters',
  })
 ];

const accountSchema = new Schema({
  shortid: {
    type: String,
    'default': shortid.generate
  },
  slug: String,
  name: {
    type: String,
    required: 'Please supply a name',
    trim: true,
    validate: nameValidator,
  }
});

// Define our indexes
accountSchema.index({
  name: 'text'
});

accountSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other accounts for same owner that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const accountsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (accountsWithSlug.length) {
    this.slug = `${this.slug}-${accountsWithSlug.length + 1}`;
  }
  next();
  // TODO make more resiliant so slugs are unique per owner
});

module.exports = mongoose.model('Account', accountSchema);
