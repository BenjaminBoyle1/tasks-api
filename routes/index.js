const router = require('express').Router();

router.get('/', (req, res) => res.send('Tasks API is running'));

router.use('/', require('./swagger'));
router.use('/auth', require('./auth'));    // OAuth login/logout/me
router.use('/tasks', require('./tasks'));  // protected below

module.exports = router;
