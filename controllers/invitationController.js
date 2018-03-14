const mongoose = require('mongoose');
const crypto = require('crypto');
const Account = mongoose.model('Account');
const Invitation = mongoose.model('Invitation');
const mail = require('../handlers/mail');
const promisify = require('es6-promisify');

exports.sendInvitation = async(req, res) => {
  const account = await Account.findOne({ _id: req.user.account });
  res.render('inviteUser', { title: `${account.name} - Add New User`});
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
  req.body.account = req.user.account;
  req.body.invitationToken = crypto.randomBytes(20).toString('hex');
  req.body.invitationExpires = Date.now() + 1209600000; // 2 weeks from now - allows db cleanup
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });

  // 2. Create a new user with reset tokens and expiry on their account
  const invitationRef = new Invitation(req.body);
  const invitationPromise = invitationRef.save();
  const accountPromise = Account.findOne({ _id: req.user.account });
  const [invitation, account] = await Promise.all([invitationPromise, accountPromise]);
  
  // 3. Send them an email with the token
  const resetURL = `http://${req.headers.host}/profile/invitation/${invitation.invitationToken}`;
  await mail.send({
    user: invitation,
    sender: req.user.name, // cuurent logged-in user
    account: account.name,
    filename: 'account-invite',
    subject: 'You\'re invited to QuickMark',
    resetURL
  });
  req.flash('success', `You have invited ${invitation.email}.`);
  // 4. redirect to login page
  res.redirect('/account/users');
};