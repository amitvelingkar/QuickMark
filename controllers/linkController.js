const mongoose = require('mongoose');
const Link = mongoose.model('Link');
const uuid = require('uuid');

exports.addLink = (req, res) => {
  res.render('editLink', { title: 'Add Link', section: req.params.sectionid });
};

exports.createLink = async (req, res) => {
  req.body.owner = req.user._id;
  // res.send(req.body);
  const link = await (new Link(req.body)).save();
  req.flash('success', `Successfully Created ${link.name}.`);
  res.redirect(`/link/${link.slug}`);
};

exports.updateLink = async (req, res) => {
  // find and update the link
  const link = await Link.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new link instead of the old one
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${link.name}</strong>. <a href="/links/${link._id}">View Link →</a>`);
  res.redirect(`/links/${link._id}/edit`);
  // Redriect them the link and tell them it worked
};

const confirmOwner = (link, user) => {
  if (!link.owner.equals(user._id)) {
    throw Error('You must own a team in order to edit it!');
  }
};

exports.editLink = async (req, res) => {
  // 1. Find the link given the ID
  const link = await Link.findOne({ _id: req.params.id });
  // 2. confirm they are the owner of the link
  confirmOwner(link, req.user);
  // 3. Render out the edit form so the user can update their link
  res.render('editLink', { title: `Edit ${link.name}`, link, section: link.section });
};

exports.getLinkBySlug = async (req, res, next) => {
  const link = await Link.findOne({ slug: req.params.slug }).populate('owner section');
  if (!link) return next();
  res.render('link', { link, title: link.name });
};