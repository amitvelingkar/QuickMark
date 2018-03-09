const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const teamSchema = new mongoose.Schema({
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
  users : [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ]
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
  // find other teams that have a slug of wes, wes-1, wes-2
  const slugRegEx = new RegExp(`^(${this.slug})((-[0-9]*$)?)$`, 'i');
  const teamsWithSlug = await this.constructor.find({ slug: slugRegEx });
  if (teamsWithSlug.length) {
    this.slug = `${this.slug}-${teamsWithSlug.length + 1}`;
  }
  next();
  // TODO make more resiliant so slugs are unique
});
/*
teamSchema.statics.getTagsList = function() {
  return this.aggregate([
    { $unwind: '$tags' },
    { $group: { _id: '$tags', count: { $sum: 1 } } },
    { $sort: { count: -1 } }
  ]);
};

teamSchema.statics.getTopStores = function() {
  return this.aggregate([
    // Lookup Stores and populate their reviews
    { $lookup: { from: 'reviews', localField: '_id', foreignField: 'team', as: 'reviews' }},
    // filter for only items that have 2 or more reviews
    { $match: { 'reviews.1': { $exists: true } } },
    // Add the average reviews field
    { $project: {
      photo: '$$ROOT.photo',
      name: '$$ROOT.name',
      reviews: '$$ROOT.reviews',
      slug: '$$ROOT.slug',
      averageRating: { $avg: '$reviews.rating' }
    } },
    // sort it by our new field, highest reviews first
    { $sort: { averageRating: -1 }},
    // limit to at most 10
    { $limit: 10 }
  ]);
}

// find reviews where the teams _id property === reviews team property
teamSchema.virtual('reviews', {
  ref: 'Review', // what model to link?
  localField: '_id', // which field on the team?
  foreignField: 'team' // which field on the review?
});

function autopopulate(next) {
  this.populate('reviews');
  next();
}

teamSchema.pre('find', autopopulate);
teamSchema.pre('findOne', autopopulate);
*/
module.exports = mongoose.model('Team', teamSchema);
