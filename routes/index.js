const router = require('express').Router();

router.get('/', (req, res) => res.send('Tasks API is running'));

router.use('/', require('./swagger'));
router.use('/auth', require('./auth'));
router.use('/tasks', require('./tasks'));
router.use('/projects', require('./projects'));

module.exports = router;
