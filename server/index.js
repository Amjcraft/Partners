const path = require('path');

require('dotenv').config({ path: path.join(__dirname + '/.env') });
require('mongoose');
require('./models/user.model');

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const logger = require('morgan');

const API_PORT = process.env.SERVER_PORT;
const app = express();
app.use(cors());

//  const mongoClient = require('./mongo/mongoClient');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const passportConfig = require('./config/passport');
const router = express.Router();
const routes = require('./routes/index.route');
const publicRoutes = require('./routes/public.route');
const mongooseConnect = require('./mongoose');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(logger('dev'));
app.use(cookieParser());
app.use(
  '/static',
  express.static(path.join(__dirname, './../public/dist')),
);
app.use(
  session({
    secret: 'bd062574-6e63-4404-a096-3fbeb179b214', //Rando GUID
    resave: true,
    saveUninitialized: false,
  }),
);

app.use('/api/', routes);

app.use('/', publicRoutes);

app.listen(API_PORT, () =>
  console.log(`LISTENING ON PORT ${API_PORT}`),
);
