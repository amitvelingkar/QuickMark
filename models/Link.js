const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const validator = require('validator');
const slug = require('slugs');

const linkSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a link name!'
  },
  description: {
    type: String,
    trim: true
  },
  slug: String,
  created: {
    type: Date,
    default: Date.now
  },
  url: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    validate: [validator.isURL, 'Invalid URL - must start with http:// or https://'],
    required: 'Please Supply a valid URL'
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an owner'
  },
  section: {
    type: mongoose.Schema.ObjectId,
    ref: 'Section',
    required: 'You must supply a section!'
  },
  visibility: {
    // 1 = private, 2 = shared
    type: Number,
    min: 1,
    max: 2
  }
});

// Define our indexes
linkSchema.index({
  name: 'text'
});

linkSchema.index({ parent: 1 });

linkSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other links that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const linksWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (linksWithSlug.length) {
    this.slug = `${this.slug}-${linksWithSlug.length + 1}`;
  }
  next();
  // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Link', linkSchema);
