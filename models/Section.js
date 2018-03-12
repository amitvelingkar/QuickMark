const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const sectionSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: 'Please enter a section name!'
  },
  slug: String,
  created: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an owner'
  },
  team: {
    type: mongoose.Schema.ObjectId,
    ref: 'Team',
    default: null,
    required: 'You must supply a team!'
  },
  visibility: {
    // 1 = private, 2 = shared
    type: Number,
    min: 1,
    max: 2
  },
  links : [ { type: mongoose.Schema.Types.ObjectId, ref: 'Link' } ]
});

// Define our indexes
sectionSchema.index({
  name: 'text'
});

sectionSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  // find other sections that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const sectionsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (sectionsWithSlug.length) {
    this.slug = `${this.slug}-${sectionsWithSlug.length + 1}`;
  }
  next();
  // TODO make more resiliant so slugs are unique
});

module.exports = mongoose.model('Section', sectionSchema);
