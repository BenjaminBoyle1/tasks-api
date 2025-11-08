const router = require('express').Router();
const ctrl = require('../controllers/tasks');
const requireLogin = require('../middleware/requireLogin');
const { handleValidation } = require('../middleware/validate');
const { body, param } = require('express-validator');

router.use(requireLogin);

const idParam = param('id').isMongoId().withMessage('Invalid task id');
const titleRequired = body('title').optional().isString().trim().notEmpty().withMessage('title cannot be empty');
const completedBool = body('completed').optional().isBoolean().withMessage('completed must be boolean');
const notesStr = body('notes').optional().isString().withMessage('notes must be string');

router.get('/',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'List all tasks (requires login)' */
  ctrl.getAll
);

router.get('/:id',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Get task by ID (requires login)' */
  idParam,
  handleValidation,
  ctrl.getSingle
);

router.post('/',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Create a task (requires login)' */
  body('title').isString().trim().notEmpty().withMessage('title is required'),
  completedBool, notesStr,
  handleValidation,
  ctrl.createTask
);

router.put('/:id',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Update a task (requires login)' */
  idParam, titleRequired, completedBool, notesStr,
  handleValidation,
  ctrl.updateTask
);

router.delete('/:id',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Delete a task (requires login)' */
  idParam,
  handleValidation,
  ctrl.deleteTask
);

module.exports = router;
