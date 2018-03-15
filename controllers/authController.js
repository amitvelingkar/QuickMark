const passport = require('passport');
const crypto = require('crypto');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const Invitation = mongoose.model('Invitation');
const promisify = require('es6-promisify');

exports.login = passport.authenticate('local', {
  failureRedirect: '/login',
  failureFlash: 'Failed Login!',
  successRedirect: '/',
  successFlash: 'You are now logged in!'
});

exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out! 👋');
  res.redirect('/');
};

exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (req.isAuthenticated()) {
    next(); // carry on! They are logged in!
    return;
  }

  if (req.path != '/') {
    // unless at root, show message about why user is being redirected
    req.flash('error', 'Oops you must be logged in to do that!');
  }
  res.redirect('/login');
};

exports.forgot = async (req, res) => {
  // 1. See if a user with that email exists
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    req.flash('error', 'No account with that email exists.');
    return res.redirect('/login');
  }
  // 2. Set reset tokens and expiry on their account
  user.resetPasswordToken = crypto.randomBytes(20).toString('hex');
  user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now
  await user.save();
  // 3. Send them an email with the token
  const resetURL = `http://${req.headers.host}/profile/reset/${user.resetPasswordToken}`;
  //res.send(resetURL);
  await mail.send({
    user,
    filename: 'password-reset',
    subject: 'Password Reset',
    resetURL
  });
  req.flash('success', `You have been emailed a password reset link.`);
  // 4. redirect to login page
  res.redirect('/login');
};

exports.reset = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });
  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }
  // if there is a user, show the rest password form
  res.render('reset', { title: 'Reset your Password' });
};

exports.invitation = async (req, res) => {
  const invitation = await Invitation.findOne({
    invitationToken: req.params.token,
    invitationExpires: { $gt: Date.now() }
  }).populate('account');
  if (!invitation) {
    req.flash('error', 'Invitation is invalid or has expired. Please ask the sender to send it again.');
    return res.redirect('/login');
  }
  // if there is a user, show the rest password form
  res.render('invitation', { invitation });
};

exports.confirmedPasswords = (req, res, next) => {
  if (req.body.password === req.body['password-confirm']) {
    next(); // keepit going!
    return;
  }
  req.flash('error', 'Passwords do not match!');
  res.redirect('back');
};

exports.update = async (req, res) => {
  const user = await User.findOne({
    resetPasswordToken: req.params.token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) {
    req.flash('error', 'Password reset is invalid or has expired');
    return res.redirect('/login');
  }

  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  const updatedUser = await user.save();
  await req.login(updatedUser);
  req.flash('success', '💃 Nice! Your password has been reset! You are now logged in!');
  res.redirect('/');
};

exports.addUser = async (req, res) => {
  // find invitation
  const invitation = await Invitation.findOne({
    invitationToken: req.params.token,
    invitationExpires: { $gt: Date.now() }
  });

  if (!invitation) {
    req.flash('error', 'Invite is invalid or has expired');
    return res.redirect('/login');
  }

  // create user
  req.body.email = invitation.email;
  req.body.account = invitation.account;
  req.body.role = invitation.role;
  const user = await (new User(req.body)).save();

  // set password
  const setPassword = promisify(user.setPassword, user);
  await setPassword(req.body.password);
  const updatedUser = await user.save();

  // delete invitation
  await invitation.remove();

  // login user
  await req.login(updatedUser);
  req.flash('success', '💃 Nice! Your password has been reset! You are now logged in!');
  res.redirect('/');
};

