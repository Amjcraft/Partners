const path = require('path');
const express = require('express');
const userRoutes = require('./user.route');

const auth = require('./auth');
//  const authRoutes = require('./auth.route');

const router = express.Router(); // eslint-disable-line new-cap

/** GET /health-check - Check service health */
router.get('/health-check', (req, res) => res.send('OK'));

router.get('/index', auth.optional, (req, res) => {
  //  Find better way
  res.sendFile(
    path.join(`${__dirname}`, './../../public/dist/index.html'),
  );
});

router.get('/dashboard', (req, res, next) => {
  const {
    headers: { authorization },
  } = req;

  if (!authorization) {
    res.writeHead(301, {
      Location: './index',
    });
    res.end();
    return;
  }
  next();
});

router.get('/dashboard', auth.required, (req, res, next) => {
  console.log(res);
  res.sendFile(
    path.join(`${__dirname}`, './../../public/dist/dashboard.html'),
  );
});

//  router.use('/auth', authRoutes);
router.use('/user', userRoutes);

module.exports = router;
