const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');
const shortid = require('shortid');

const teamSchema = new mongoose.Schema({
  shortid: {
    type: String,
    'default': shortid.generate
  },
  name: {
    type: String,
    trim: true,
    required: 'Please enter a team name!'
  },
  slug: String,
  created: {
    type: Date,
    default: Date.now
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: 'You must supply an author'
  },
  admins : [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
  members : [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ],
},{
  toJSON: { virtuals: true },
  toObject: { virtuals: true },
});

// Define our indexes
teamSchema.index({
  name: 'text'
});

teamSchema.pre('save', async function(next) {
  if (!this.isModified('name')) {
    next(); // skip it
    return; // stop this function from running
  }
  this.slug = slug(this.name);
  const accountId = this.owner.account;
  // find other teams for same account that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const teamsWithSlug = await this.constructor.find({ 
    slug: slugRegEx,
    account: accountId
  });
  if (teamsWithSlug.length) {
    this.slug = `${this.slug}-${teamsWithSlug.length + 1}`;
  }
  next();
  // TODO make more resiliant so slugs are unique per owner
});

// find sections where the team's _id property === section's team property
teamSchema.virtual('sections', {
  ref: 'Section', // what model to link?
  localField: '_id', // which field on the team?
  foreignField: 'team' // which field on the section?
});

function autopopulate(next) {
  this.populate('sections');
  next();
}

// teamSchema.pre('find', autopopulate);
teamSchema.pre('findOne', autopopulate);

module.exports = mongoose.model('Team', teamSchema);
