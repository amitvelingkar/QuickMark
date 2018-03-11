const mongoose = require('mongoose');
const Account = mongoose.model('Account');
const promisify = require('es6-promisify');

exports.createAccount = async (req, res, next) => {
  const account = await (new Account({ name: req.body.accountName })).save();
  //res.send(account);

  // pass account id to next function
  req.body.account = account._id;
  next();
};
