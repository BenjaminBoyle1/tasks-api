const router = require('express').Router();

// Root (quick health)
router.get('/', (req, res) => res.send('Tasks API is running'));

// Swagger UI at /api-docs
router.use('/', require('./swagger'));

// OAuth login/logout/me
router.use('/auth', require('./auth'));

// Tasks API (protected in routes/tasks.js)
router.use('/tasks', require('./tasks'));

// Optional debug ping
// router.get('/_debug/ping', (req, res) => res.json({ ok: true }));

module.exports = router;
