'use strict';

var {
  express,
  logger,
  passport,
  FacebookStrategy,
  cors,
} = require('./config/dependencies');
var { errorHandler } = require('./middleware');
var { UserService } = require('./services');

var app = express();

// Initialize passport.
passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_CLIENT_ID,
  clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
}, async(accessToken, refreshToken, profile, done) => {
  try {
    var user = await UserService.getByFacebookId(profile.id, 'withDriverId');
    if (user) {
      await UserService.update(user.id, { facebookToken: accessToken });
    } else {
      user = { facebookId: profile.id };
    }
    done(null, user);
  } catch (err) {
    done(err);
  }
}));

app.use(cors());
app.use(logger('dev'));
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false }));

require('./routes')(app);

app.use(errorHandler.default);

module.exports = app;
