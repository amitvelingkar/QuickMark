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
  }
  /*
  ,
  // possibly, we would want to store references to links as an array to allow users to custon sort them (same with sections)
  // TODO - research how people implementing sorting pattern in mongoose schema
  links : [ { type: mongoose.Schema.Types.ObjectId, ref: 'Link' } ]
  */
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Define our indexes
sectionSchema.index({
  name: 'text'
});

// find reviews where the section's _id property === link's section property
sectionSchema.virtual('links', {
  ref: 'Link', // what model to link?
  localField: '_id', // which field on the section?
  foreignField: 'section' // which field on the link?
});

function autopopulate(next) {
  this.populate('links');
  next();
}

sectionSchema.pre('find', autopopulate);
sectionSchema.pre('findOne', autopopulate);

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
