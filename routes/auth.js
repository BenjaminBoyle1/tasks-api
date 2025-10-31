const router = require('express').Router();
const passport = require('../auth/passport');

// Start Google OAuth (use a normal browser tab, not Swagger "Try it out")
router.get('/google',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Start Google OAuth 2.0 login'
     #swagger.description = 'Redirects to Google for authentication.' */
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// OAuth callback (Google redirects here after consent)
router.get('/google/callback',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Google OAuth 2.0 callback'
     #swagger.description = 'Creates a session and redirects to /auth/me.' */
  passport.authenticate('google', { failureRedirect: '/api-docs', session: true }),
  (req, res) => {
    // After successful login, show who you are (or redirect to your app)
    res.redirect('/auth/me');
  }
);

// Who am I? (handy to verify the session is active)
router.get('/me',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Return the current authenticated user (session-based)' */
  (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    const { _id, email, firstName, lastName, picture } = req.user;
    res.json({ id: _id, email, firstName, lastName, picture });
  }
);

// Logout (destroy session)
router.post('/logout',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Logout and destroy the session' */
  (req, res, next) => {
    req.logout?.((err) => {
      if (err) return next(err);
      req.session?.destroy(() => {
        res.status(200).json({ message: 'Logged out' });
      });
    });
  }
);

module.exports = router;
