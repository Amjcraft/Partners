const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();

const auth = require('./auth');

const Users = mongoose.model('Users');

const {
  USER_INFO_COOKIE,
  USER_INFO_COOKIE_EXP_TIME,
} = require('../constants/cookies');

/** 
 * TO-DO:
  Encrypted Cookie at some Point
 * 
*/

// POST new user route (optional, everyone has access)
router.post('/', auth.optional, (req, res, next) => {
  console.log(req.body);
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save().then(() => {
    const userJSON = finalUser.toAuthJSON();
    res.cookie(USER_INFO_COOKIE, userJSON, {
      expires: new Date(Date.now() + USER_INFO_COOKIE_EXP_TIME),
      signed: true,
    });
    res.json({ user: userJSON });
  });
});

//  POST login route (optional, everyone has access)
router.post('/login', auth.optional, (req, res, next) => {
  const {
    body: { user },
  } = req;

  if (!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if (!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  return passport.authenticate(
    'local',
    { session: false },
    (err, passportUser, info) => {
      if (err) {
        return next(err);
      }

      if (passportUser) {
        const ppUser = passportUser;
        ppUser.token = passportUser.generateJWT();
        const userJson = pp.toAuthJSON();
        res.cookie(USER_INFO_COOKIE, userJson, {
          expires: new Date(Date.now() + USER_INFO_COOKIE_EXP_TIME),
          signed: true,
        });
        return res.json({ user: userJson });
      }

      return status(400).info;
    },
  )(req, res, next);
});

// GET current route (required, only authenticated users have access)
router.get('/current', auth.required, (req, res, next) => {
  const {
    payload: { id },
  } = req;

  return Users.findById(id).then(user => {
    if (!user) {
      return res.sendStatus(400);
    }

    return res.json({ user: user.toAuthJSON() });
  });
});

module.exports = router;
