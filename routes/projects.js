const router = require('express').Router();
const { body, param } = require('express-validator');
const requireLogin = require('../middleware/requireLogin');
const { handleValidation } = require('../middleware/validate');
const ctrl = require('../controllers/projects');

router.use(requireLogin);

const idParam = param('id').isMongoId().withMessage('Invalid project id');
const nameRequired = body('name').isString().trim().notEmpty().withMessage('name is required');
const statusEnum = body('status').optional().isIn(['planned', 'active', 'paused', 'completed']).withMessage('invalid status');
const priorityRange = body('priority').optional().isInt({ min: 1, max: 5 }).withMessage('priority must be 1-5');
const dueDateISO = body('dueDate').optional({ values: 'falsy' }).isISO8601().withMessage('dueDate must be ISO8601');
const tagsArray = body('tags').optional().isArray().withMessage('tags must be an array of strings');
const tagsStrings = body('tags.*').optional().isString().withMessage('each tag must be a string');
const budgetNum = body('budget').optional().isFloat({ min: 0 }).withMessage('budget must be >= 0');

router.get('/',
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'List my projects (requires login)' */
  ctrl.getAll
);

router.get('/:id',
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'Get a project by ID (requires login)' */
  idParam,
  handleValidation,
  ctrl.getSingle
);

router.post('/',
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'Create a project (requires login)' */
  nameRequired, statusEnum, priorityRange, dueDateISO, tagsArray, tagsStrings, budgetNum,
  handleValidation,
  ctrl.createProject
);

router.put('/:id',
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'Update a project (requires login)' */
  idParam, statusEnum, priorityRange, dueDateISO, tagsArray, tagsStrings, budgetNum,
  handleValidation,
  ctrl.updateProject
);

router.delete('/:id',
  /* #swagger.tags = ['Projects']
     #swagger.summary = 'Delete a project (requires login)' */
  idParam,
  handleValidation,
  ctrl.deleteProject
);

module.exports = router;
