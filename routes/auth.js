const router = require('express').Router();
const passport = require('../auth/passport');

// Start Google OAuth (open in a regular browser tab)
router.get('/google',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Start Google OAuth 2.0 login' */
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// OAuth callback
router.get('/google/callback',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Google OAuth 2.0 callback' */
  passport.authenticate('google', { failureRedirect: '/api-docs', session: true }),
  (req, res) => res.redirect('/auth/me')
);

// Who am I?
router.get('/me',
  /* #swagger.tags = ['Auth']
     #swagger.summary = 'Return current authenticated user (session)' */
  (req, res) => {
    if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
    const { _id, email, firstName, lastName, picture } = req.user;
    res.json({ id: _id, email, firstName, lastName, picture });
  }
);

// Logout (support GET and POST)
const doLogout = (req, res, next) => {
  req.logout?.((err) => {
    if (err) return next(err);
    req.session?.destroy(() => res.status(200).json({ message: 'Logged out' }));
  });
};
router.post('/logout', /* #swagger.tags = ['Auth'] */ doLogout);
router.get('/logout',  /* #swagger.tags = ['Auth'] */ doLogout);

module.exports = router;
