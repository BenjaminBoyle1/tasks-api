const router = require('express').Router();

// Root text (handy for quick health check)
router.get('/', (req, res) => res.send('Tasks API is running'));

// Swagger UI at /api-docs 
router.use('/', require('./swagger'));

// Tasks endpoints mounted under /tasks
router.use('/tasks', require('./tasks'));

module.exports = router;
