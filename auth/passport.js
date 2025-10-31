const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const db = require('../db/connect');
const { ObjectId } = require('mongodb');

const USERS = 'users';

passport.serializeUser((user, done) => {
  done(null, user._id.toString());
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await db.getDb().collection(USERS).findOne({ _id: new ObjectId(id) });
    done(null, user || null);
  } catch (e) {
    done(e);
  }
});

passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,         // in .env
    clientSecret: process.env.GOOGLE_CLIENT_SECRET, // in .env
    callbackURL: process.env.OAUTH_CALLBACK_URL     // in .env
  },
  async (_accessToken, _refreshToken, profile, done) => {
    try {
      const users = db.getDb().collection(USERS);
      const email = profile.emails?.[0]?.value;
      if (!email) return done(new Error('No email returned by Google'), null);

      let user = await users.findOne({ email });
      if (!user) {
        const doc = {
          provider: 'google',
          providerId: profile.id,
          email,
          firstName: profile.name?.givenName || '',
          lastName: profile.name?.familyName || '',
          picture: profile.photos?.[0]?.value || '',
          createdAt: new Date()
        };
        const result = await users.insertOne(doc);
        user = { _id: result.insertedId, ...doc };
      }
      return done(null, user);
    } catch (err) {
      return done(err, null);
    }
  }
));

module.exports = passport;
