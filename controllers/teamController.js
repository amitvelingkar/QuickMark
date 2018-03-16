const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const User = mongoose.model('User');
//const multer = require('multer');
//const jimp = require('jimp');
const uuid = require('uuid');

exports.homePage = (req, res) => {
  res.render('index');
};

exports.addTeam = (req, res) => {
  res.render('editTeam', { title: 'Add Team' });
};

exports.createTeam = async (req, res) => {
  req.body.owner = req.user._id;
  req.body.account = req.user.account._id;
  //res.send(req.body);
  const team = await (new Team(req.body)).save();
  req.flash('success', `Successfully Created ${team.name}.`);
  res.redirect(`/team/${team.slug}`);
};

exports.getTeams = async (req, res) => {
  // 1. Query the database for a list of all teams
  // TODO - filter only teams for which current user is owner or member
  const teams = await Team
    .find({ account: req.user.account._id })
    .sort({ created: 'desc' });

  res.render('teams', { title: 'Teams', teams });
};

const confirmOwner = (team, user) => {
  if (!team.owner.equals(user._id)) {
    throw Error('You must own a team in order to edit it!');
  }
};

exports.editTeam = async (req, res) => {
  // 1. Find the team given the ID
  const team = await Team.findOne({ _id: req.params.id });
  // 2. confirm they are the owner of the team
  confirmOwner(team, req.user);
  // 3. Render out the edit form so the user can update their team
  res.render('editTeam', { title: `Edit ${team.name}`, team });
};

exports.updateTeam = async (req, res) => {
  // find and update the team
  const team = await Team.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new team instead of the old one
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${team.name}</strong>. <a href="/team/${team.slug}">View Team →</a>`);
  res.redirect(`/teams/${team._id}/edit`);
  // Redriect them the team and tell them it worked
};

exports.getTeamBySlug = async (req, res, next) => {
  const team = await Team.findOne({ slug: req.params.slug }).populate({
    path: 'owner sections',
    populate: {
      path: 'links'
    }
  });
  if (!team) return next();
  res.render('team', { team, title: team.name });
};

exports.searchTeams = async (req, res) => {
  const teams = await Team
  // first find teams that match
  .find({
    $text: {
      $search: req.query.q
    }
  }, {
    score: { $meta: 'textScore' }
  })
  // the sort them
  .sort({
    score: { $meta: 'textScore' }
  })
  // limit to only 5 results
  .limit(5);
  res.json(teams);
};
/*
exports.mapTeams = async (req, res) => {
  const coordinates = [req.query.lng, req.query.lat].map(parseFloat);
  const q = {
    location: {
      $near: {
        $geometry: {
          type: 'Point',
          coordinates
        },
        $maxDistance: 10000 // 10km
      }
    }
  };

  const teams = await Team.find(q).select('slug name description location photo').limit(10);
  res.json(teams);
};

exports.mapPage = (req, res) => {
  res.render('map', { title: 'Map' });
};

exports.heartTeam = async (req, res) => {
  const hearts = req.user.hearts.map(obj => obj.toString());

  const operator = hearts.includes(req.params.id) ? '$pull' : '$addToSet';
  const user = await User
    .findByIdAndUpdate(req.user._id,
      { [operator]: { hearts: req.params.id } },
      { new: true }
    );
  res.json(user);
};

exports.getHearts = async (req, res) => {
  const teams = await Team.find({
    _id: { $in: req.user.hearts }
  });
  res.render('teams', { title: 'Hearted Teams', teams });
};

exports.getTopTeams = async (req, res) => {
  const teams = await Team.getTopTeams();
  res.render('topTeams', { teams, title:'⭐ Top Teams!'});
}
*/