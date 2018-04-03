const mongoose = require('mongoose');
const crypto = require('crypto');
const Account = mongoose.model('Account');
const User = mongoose.model('User');
const Invitation = mongoose.model('Invitation');
const mail = require('../handlers/mail');
const promisify = require('es6-promisify');

exports.createAccount = async (req, res, next) => {
  const account = await (new Account({ name: req.body.accountName })).save();
  req.body.account = account._id;
  next();
};

exports.getAccount = (req, res) => {
  res.render('account', { title: 'Admin' });
};

exports.getUsers = async (req, res) => {
  // 1. Query the database for a list of all teams
  // TODO - filter only teams for which current user is owner or member
  const usersPromise = User
  .find({ account: req.user.account._id })
  .sort({ role: 'asc', name: 'asc' });
  
  const invitationsPromise = Invitation
  .find({ account: req.user.account._id })
  .sort({ email: 'asc' });

  const [users, invitations] = await Promise.all([usersPromise, invitationsPromise]);

  res.render('users', { title: 'Users', users, invitations });
};

exports.getUsers2 = async (req, res) => {
  // 1. Query the database for a list of all teams
  // TODO - filter only teams for which current user is owner or member
  const usersPromise = User
  .find({ account: req.user.account })
  .sort({ role: 'asc', name: 'asc' });
  
  const invitationsPromise = Invitation
  .find({ account: req.user.account })
  .sort({ email: 'asc' });

  const [users, invitations] = await Promise.all([usersPromise, invitationsPromise]);

  res.json({ users, invitations });
};

