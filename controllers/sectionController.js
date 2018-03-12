const mongoose = require('mongoose');
const Section = mongoose.model('Section');
const uuid = require('uuid');

exports.addSection = (req, res) => {
  res.render('editSection', { title: 'Add Section', team: req.params.teamid });
};

exports.createSection = async (req, res) => {
  req.body.owner = req.user._id;
  
  const section = await (new Section(req.body)).save();
  req.flash('success', `Successfully Created ${section.name}.`);
  res.redirect(`/section/${section.slug}`);
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
  req.flash('success', `Successfully updated <strong>${section.name}</strong>. <a href="/sections/${section._id}">View Section →</a>`);
  res.redirect(`/sections/${section._id}/edit`);
  // Redriect them the section and tell them it worked
};

exports.editSection = async (req, res) => {
  // 1. Find the section given the ID
  const section = await Section.findOne({ _id: req.params.id });
  // 2. confirm they are the owner of the section
  confirmOwner(section, req.user);
  // 3. Render out the edit form so the user can update their section
  res.render('editSection', { title: `Edit ${section.name}`, section });
};

exports.getSectionBySlug = async (req, res, next) => {
  const section = await Section.findOne({ slug: req.params.slug }).populate('owner sections');
  if (!section) return next();
  res.render('section', { section, title: section.name });
};