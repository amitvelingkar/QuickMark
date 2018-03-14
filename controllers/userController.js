const mongoose = require('mongoose');
const User = mongoose.model('User');
const promisify = require('es6-promisify');

exports.loginForm = (req, res) => {
  res.render('login', { title: 'Login' });
};

exports.registerForm = (req, res) => {
  res.render('register', { title: 'Register' });
};

exports.validateRegister = (req, res, next) => {
  req.sanitizeBody('name');
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.checkBody('accountName', 'Organization name must be between 3 and 25 characters!').isLength(3, 25);
  req.sanitizeBody('email').normalizeEmail({
    gmail_remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('password', 'Password Cannot be Blank!').notEmpty();
  req.checkBody('password-confirm', 'Confirmed Password cannot be blank!').notEmpty();
  req.checkBody('password-confirm', 'Oops! Your passwords do not match').equals(req.body.password);

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('register', { title: 'Register', body: req.body, flashes: req.flash() });
    return; // stop the fn from running
  }

  next(); // there were no errors!
};

// TODO - if account is different - what should we do??? 
// most apps insist on email per account, so we may be good for now
exports.confirmNewUser = async (req, res, next) => {
  // make sure this user with same email does not exist
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    req.flash('error', `<strong>${user.email}</strong> is already registered with QuickMark. Please try log-in or password recovery.`);
    return res.redirect('back');
  }
  next(); // keep going
};

exports.register = async (req, res, next) => {
  // TODO
  const user = new User({ email: req.body.email, name: req.body.name, account: req.body.account, role: 1 });
  const register = promisify(User.register, User);
  await register(user, req.body.password);
  next(); // pass to authController.login
};

exports.profile = (req, res) => {
  res.render('profile', { title: 'Edit Your Profile' });
};

exports.updateProfile = async (req, res) => {
  const updates = {
    name: req.body.name,
    email: req.body.email
  };

  const user = await User.findOneAndUpdate(
    { _id: req.user._id },
    { $set: updates },
    { new: true, runValidators: true, context: 'query' }
  );
  req.flash('success', 'Updated the profile!');
  res.redirect('back');
};
