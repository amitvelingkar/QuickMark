const mongoose = require('mongoose');
const Link = mongoose.model('Link');
const Section = mongoose.model('Section');
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
  })
  .populate('section')
  .exec();
  req.flash('success', `Successfully updated <strong>${link.name}</strong>. <a href="/section/${link.section.slug}">Back to Section →</a>`);
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

/* SAVE TEAM */
exports.createLink2 = async (req, res, next) => {
  const section = await Section.findOne({ _id: req.params.id });

  // not really needed since we have the id but good to prevent orphan links
  if (!section) {
    return res.status(404).send('Section Not Found');
  }

  req.body.owner = req.user._id;
  req.body.section = section._id;
  const link = await (new Link(req.body)).save();
  if (link) {
    res.json(link);
  }
};

exports.deleteLink = async (req, res, next) => {
  const link = await Link.findOneAndRemove({ _id: req.params.id }, req.body);
  if (link) {
    res.json(link);
  }
};