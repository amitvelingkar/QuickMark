const mongoose = require('mongoose');
const crypto = require('crypto');
const Account = mongoose.model('Account');
const Invitation = mongoose.model('Invitation');
const mail = require('../handlers/mail');
const promisify = require('es6-promisify');

exports.sendInvitation = (req, res) => {
  res.render('inviteUser', { title: `${req.user.account.name} - Add New User`});
};

exports.editInvitation = async (req, res) => {
  
};

// TODO - if account is different - what should we do??? 
// most apps insist on email per account, so we may be good for now
exports.confirmNewInvitation = async (req, res, next) => {
  // make sure this user with same email does not exist
  const invitation = await Invitation.findOne({ email: req.body.email });
  if (invitation) {
    req.flash('error', `<strong>${invitation.email}</strong> has already been invited.`);
    return res.redirect('/account/users');
  }
  next(); // keep going
};

exports.inviteUser = async (req, res) => {
  // 1. Cleanup & prepare data
  req.body.account = req.user.account._id;
  req.body.invitationToken = crypto.randomBytes(20).toString('hex');
  req.body.invitationExpires = Date.now() + 1209600000; // 2 weeks from now - allows db cleanup
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  // 2. Create a new user with reset tokens and expiry on their account
  const invitation = await (new Invitation(req.body)).save();

  // 3. Send them an email with the token
  const resetURL = `http://${req.headers.host}/profile/invitation/${invitation.invitationToken}`;
  await mail.send({
    user: invitation,
    sender: req.user.name, // cuurent logged-in user
    account: req.user.account.name,
    filename: 'account-invite',
    subject: 'You\'re invited to QuickMark',
    resetURL
  });
  req.flash('success', `You have invited ${invitation.email}.`);
  // 4. redirect to login page
  res.redirect('/account/users');
};

exports.confirmNewInvitation2 = async (req, res, next) => {
  // make sure this user with same email does not exist
  const invitation = await Invitation.findOne({ email: req.body.email });
  if (invitation) {
    return res.status(400).send(`<strong>${invitation.email}</strong> has already been invited.`);
  }
  next(); // keep going
};

exports.inviteUser2 = async (req, res) => {
  const host = 'http://localhost:8080';

  // 1. Cleanup & prepare data
  req.body.account = req.user.account;
  req.body.invitationToken = crypto.randomBytes(20).toString('hex');
  req.body.invitationExpires = Date.now() + 1209600000; // 2 weeks from now - allows db cleanup
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  // 2. Create a new user with reset tokens and expiry on their account
  const invitation = await (new Invitation(req.body)).save();

  // 3. Send them an email with the token
  const resetURL = `${host}/invitation/${invitation.invitationToken}`;
  await mail.send({
    user: invitation,
    sender: req.user.name, // cuurent logged-in user
    account: req.user.account.name,
    filename: 'account-invite',
    subject: 'You\'re invited to QuickMark',
    resetURL
  });

  return res.json(invitation);
};