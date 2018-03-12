const express = require('express');
const router = express.Router();
const storeController = require('../controllers/storeController');
const teamController = require('../controllers/teamController');
const sectionController = require('../controllers/sectionController');
const linkController = require('../controllers/linkController');
const accountController = require('../controllers/accountController');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const reviewController = require('../controllers/reviewController');
const { catchErrors } = require('../handlers/errorHandlers');

// OLD ROUTES - EXAMPLE APP
router.get('/', catchErrors(storeController.getStores));
router.get('/stores', catchErrors(storeController.getStores));
router.get('/stores/page/:page', catchErrors(storeController.getStores));
router.get('/add', authController.isLoggedIn, storeController.addStore);

router.post('/add',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.createStore)
);

router.post('/add/:id',
  storeController.upload,
  catchErrors(storeController.resize),
  catchErrors(storeController.updateStore)
);

router.get('/stores/:id/edit', catchErrors(storeController.editStore));
router.get('/store/:slug', catchErrors(storeController.getStoreBySlug));

router.get('/tags', catchErrors(storeController.getStoresByTag));
router.get('/tags/:tag', catchErrors(storeController.getStoresByTag));

// TEAM ROUTES
router.get('/teams', catchErrors(teamController.getTeams));
router.get('/teams/add', authController.isLoggedIn, teamController.addTeam);

router.post('/teams/add',
  catchErrors(teamController.createTeam)
);
router.post('/teams/add/:id',
  catchErrors(teamController.updateTeam)
);

router.get('/teams/:id/edit', catchErrors(teamController.editTeam));
router.get('/team/:slug', catchErrors(teamController.getTeamBySlug));

// SECTION ROUTES
router.get('/team/:teamid/sections/add', authController.isLoggedIn, sectionController.addSection);

router.post('/sections/add',
catchErrors(sectionController.createSection)
);

router.post('/sections/add/:id',
catchErrors(sectionController.updateSection)
);

router.get('/sections/:id/edit', catchErrors(sectionController.editSection));
router.get('/section/:slug', catchErrors(sectionController.getSectionBySlug));

// SECTION ROUTES
router.get('/section/:sectionid/links/add', authController.isLoggedIn, linkController.addLink);

router.post('/links/add',
catchErrors(linkController.createLink)
);

router.post('/links/add/:id',
catchErrors(linkController.updateLink)
);

router.get('/links/:id/edit', catchErrors(linkController.editLink));
router.get('/link/:slug', catchErrors(linkController.getLinkBySlug));

// REGISTER & LOGIN ROUTES
router.get('/login', userController.loginForm);
router.post('/login', authController.login);
router.get('/register', userController.registerForm);

// 1. Validate the registration data
// 2. Create new account
// 3. register the user
// 4. we need to log them in
router.post('/register',
  userController.validateRegister,
  catchErrors(userController.checkIfUserExists),
  catchErrors(accountController.createAccount),
  catchErrors(userController.register),
  authController.login
);

router.get('/logout', authController.logout);

router.get('/account', authController.isLoggedIn, userController.account);
router.post('/account', catchErrors(userController.updateAccount));
router.post('/account/forgot', catchErrors(authController.forgot));
router.get('/account/reset/:token', catchErrors(authController.reset));
router.post('/account/reset/:token',
  authController.confirmedPasswords,
  catchErrors(authController.update)
);
router.get('/map', storeController.mapPage);
router.get('/hearts', authController.isLoggedIn, catchErrors(storeController.getHearts));
router.post('/reviews/:id',
  authController.isLoggedIn,
  catchErrors(reviewController.addReview)
);

router.get('/top', catchErrors(storeController.getTopStores));

/*
  API
*/

router.get('/api/search', catchErrors(storeController.searchStores));
router.get('/api/stores/near', catchErrors(storeController.mapStores));
router.post('/api/stores/:id/heart', catchErrors(storeController.heartStore));

module.exports = router;
