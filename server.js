require('dotenv').config(); // Load .env ONCE here

const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('./auth/passport'); // initializes strategies & serialize/deserialize
const mongodb = require('./db/connect');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  // Minimal CORS like your older project
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  })
  // Sessions (for OAuth) — cookie-based
  .use(session({
    secret: process.env.SESSION_SECRET || 'change_me',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    }
  }))
  .use(passport.initialize())
  .use(passport.session())
  // Single root router (BYUI pattern)
  .use('/', require('./routes'));

if (process.env.NODE_ENV === 'production') {
  app.set('trust proxy', 1); // needed for secure cookies behind proxy (Render)
}

mongodb.initDb((err) => {
  if (err) {
    console.error('DB connection failed:', err);
  } else {
    app.listen(port, () => {
      console.log(`Connected to DB and listening on ${port}`);
    });
  }
});
