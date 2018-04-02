const passport = require('passport');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
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

// traditional route handler, passed req/res
exports.login2 = (req, res) => {
    req.body.email = req.body.username;
    //return res.json(req.body);
  
    // generate the authenticate method and pass the req/res
    passport.authenticate('local', function(err, user, info) {
      if (err) { 
        return res.status(400).json({
          success: false,
          message: err.message
        });
      }
      if (!user) {
        return res.status(400).json({
          success: false,
          message: 'Incorrect email or password - especial'
        });
      }
  
      // req / res held in closure
      req.logIn(user, function(err) {
        if (err) {
          return res.status(400).json({
            success: false,
            message: err.message
          });
        }
        
        // success - return a token and data (subset of user's data)
        // This ensures that data cannot be stolen and is secure.
        // Also, token expires in a month - helping with security
        const payload = {
          sub: user._id, // user's id
          exp: (Date.now() + 2592000000) // 30 days from now
        }

        // create a token string
        const token = jwt.sign(payload, process.env.JWT_SECRET);
        return res.json({
          success: true,
          message: 'You have successfully logged in!',
          token,
          name: user.name,
          role: user.role,       // user's role - we will double check rights on server side but helps provide clean ux
          account: user.account, // knowing account ID will makes calls easier
        });
      });
  
    })(req, res);
  
  };

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

exports.isAuthenticated = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).end();
  }

  // get the last part from a authorization header string like "bearer token-value"
  const token = req.headers.authorization.split(' ')[1];

  // decode the token using a secret key-phrase
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  if (decoded && decoded.sub) {
    const userId = decoded.sub;
    const user = await User.findOne({ _id: userId });
    if (user) {
      req.user = user; // add user to request
      return next(); // success
    }
  }
  // either token has expired or user not found - call should make user re-login
  return res.status(401).end();
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

