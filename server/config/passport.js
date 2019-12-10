const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local');

const Users = mongoose.model('Users');

passport.use(
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
    },
    (email, password, done) => {
      console.log('asdf');
      Users.findOne({ email })
        .then(user => {
          if (!user || !user.validatePassword(password)) {
            return done(null, false, {
              errors: { 'email or password': 'is invalid' },
            });
          }
          console.log('hit 1');
          return done(null, user);
        })
        .catch(() => {
          console.log('hit 2');
          done();
        });
    },
  ),
);
