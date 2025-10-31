const router = require('express').Router();
const ctrl = require('../controllers/tasks');
const requireLogin = require('../middleware/requireLogin');

// Everything below requires an authenticated session
router.use(requireLogin);

// GET all
router.get('/',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'List all tasks (requires login)' */
  ctrl.getAll
);

// GET by ID
router.get('/:id',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Get task by ID (requires login)' */
  ctrl.getSingle
);

// POST create
router.post('/',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Create a task (requires login)' */
  ctrl.createTask
);

// PUT update
router.put('/:id',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Update a task (requires login)' */
  ctrl.updateTask
);

// DELETE
router.delete('/:id',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Delete a task (requires login)' */
  ctrl.deleteTask
);

module.exports = router;
