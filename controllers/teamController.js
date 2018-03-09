const mongoose = require('mongoose');
const Team = mongoose.model('Team');
const User = mongoose.model('User');
//const multer = require('multer');
//const jimp = require('jimp');
const uuid = require('uuid');

/*
const multerOptions = {
  storage: multer.memoryStorage(),
  fileFilter(req, file, next) {
    const isPhoto = file.mimetype.startsWith('image/');
    if(isPhoto) {
      next(null, true);
    } else {
      next({ message: 'That filetype isn\'t allowed!' }, false);
    }
  }
};
*/
exports.homePage = (req, res) => {
  res.render('index');
};

exports.addTeam = (req, res) => {
  res.render('editTeam', { title: 'Add Team' });
};

/*
exports.upload = multer(multerOptions).single('photo');

exports.resize = async (req, res, next) => {
  // check if there is no new file to resize
  if (!req.file) {
    next(); // skip to the next middleware
    return;
  }
  const extension = req.file.mimetype.split('/')[1];
  req.body.photo = `${uuid.v4()}.${extension}`;
  // now we resize
  const photo = await jimp.read(req.file.buffer);
  await photo.resize(800, jimp.AUTO);
  await photo.write(`./public/uploads/${req.body.photo}`);
  // once we have written the photo to our filesystem, keep going!
  next();
};
*/

exports.createTeam = async (req, res) => {
  req.body.owner = req.user._id;
  const team = await (new Team(req.body)).save();
  req.flash('success', `Successfully Created ${team.name}.`);
  res.redirect(`/team/${team.slug}`);
};

exports.getTeams = async (req, res) => {
  const page = req.params.page || 1;
  const limit = 10;
  const skip = (page * limit) - limit;

  // 1. Query the database for a list of all teams
  const teamsPromise = Team
    .find()
    .skip(skip)
    .limit(limit)
    .sort({ created: 'desc' });

  const countPromise = Team.count();

  const [teams, count] = await Promise.all([teamsPromise, countPromise]);
  const pages = Math.ceil(count / limit);
  if (!teams.length && skip) {
    req.flash('info', `Hey! You asked for page ${page}. But that doesn't exist. So I put you on page ${pages}`);
    res.redirect(`/teams/page/${pages}`);
    return;
  }

  res.render('teams', { title: 'Teams', teams, page, pages, count });
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
  // set the location data to be a point
  req.body.location.type = 'Point';
  // find and update the team
  const team = await Team.findOneAndUpdate({ _id: req.params.id }, req.body, {
    new: true, // return the new team instead of the old one
    runValidators: true
  }).exec();
  req.flash('success', `Successfully updated <strong>${team.name}</strong>. <a href="/teams/${team.slug}">View Team →</a>`);
  res.redirect(`/teams/${team._id}/edit`);
  // Redriect them the team and tell them it worked
};

exports.getTeamBySlug = async (req, res, next) => {
  const team = await Team.findOne({ slug: req.params.slug }).populate('author reviews');
  if (!team) return next();
  res.render('team', { team, title: team.name });
};
/*
exports.getTeamsByTag = async (req, res) => {
  const tag = req.params.tag;
  const tagQuery = tag || { $exists: true, $ne: [] };

  const tagsPromise = Team.getTagsList();
  const teamsPromise = Team.find({ tags: tagQuery });
  const [tags, teams] = await Promise.all([tagsPromise, teamsPromise]);


  res.render('tag', { tags, title: 'Tags', tag, teams });
};
*/

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