const mongoose = require('mongoose');
const Section = mongoose.model('Section');
const Team = mongoose.model('Team');
const uuid = require('uuid');

exports.addSection = (req, res) => {
  res.render('editSection', { title: 'Add Section', team: req.params.teamid });
};

exports.createSection = async (req, res) => {
  req.body.owner = req.user._id;
  // res.send(req.body);
  const section = await (new Section(req.body)).save();
  req.flash('success', `Successfully Created ${section.name}.`);
  res.redirect(`/section/${section.slug}`);
};

exports.updateSection = async (req, res) => {
  // find and update the section
  const section = await Section.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new section instead of the old one
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${section.name}</strong>. <a href="/section/${section.slug}">View Section →</a>`);
  res.redirect(`/sections/${section._id}/edit`);
  // Redriect them the section and tell them it worked
};

const confirmOwner = (link, user) => {
  if (!link.owner.equals(user._id)) {
    throw Error('You must own a team in order to edit it!');
  }
};

exports.editSection = async (req, res) => {
  // 1. Find the section given the ID
  const section = await Section.findOne({ _id: req.params.id });
  // 2. confirm they are the owner of the section
  confirmOwner(section, req.user);
  // 3. Render out the edit form so the user can update their section
  res.render('editSection', { title: `Edit ${section.name}`, section, team: section.team });
};

exports.getSectionBySlug = async (req, res, next) => {
  const section = await Section.findOne({ slug: req.params.slug }).populate('owner team');
  if (!section) return next();
  res.render('section', { section, title: section.name });
};

exports.getSections2 = async (req, res) => {
  //res.json(req.params);
  const team = await Team.findOne({ slug: req.params.slug });
  if (!team) {
    return res.status(404).send('Team Not Found');
  }
  
  const sections = await Section.find({ team: team._id });
  res.json(sections);
};

/* SAVE TEAM */
exports.createSection2 = async (req, res, next) => {
  req.body.owner = req.user._id;
  req.body.account = req.user.account;
  const section = await (new Section(req.body)).save();
  if (section) {
    res.json(section);
  }
};

exports.deleteSection = async (req, res, next) => {
  const section = await Section.findOneAndRemove({ _id: req.params.id }, req.body);
  if (section) {
    res.json(section);
  }
};