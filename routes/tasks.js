const router = require('express').Router();
const ctrl = require('../controllers/tasks');

// GET all
router.get('/',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'List all tasks'
     #swagger.responses[200] = {
        description: 'OK',
        schema: { type: 'array', items: { $ref: '#/definitions/Task' } }
     }
     #swagger.responses[500] = { description: 'Server error' } */
  ctrl.getAll
);

// GET by ID
router.get('/:id',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Get task by ID'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.responses[200] = { description: 'Found', schema: { $ref: '#/definitions/Task' } }
     #swagger.responses[400] = { description: 'Invalid ID' }
     #swagger.responses[404] = { description: 'Not found' } */
  ctrl.getSingle
);

// POST create
router.post('/',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Create a task'
     #swagger.parameters['body'] = {
        in: 'body', required: true, schema: { $ref: '#/definitions/CreateTask' }
     }
     #swagger.responses[201] = { description: 'Created' }
     #swagger.responses[400] = { description: 'Validation error' } */
  ctrl.createTask
);

// PUT update
router.put('/:id',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Update a task'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.parameters['body'] = {
        in: 'body', required: true, schema: { $ref: '#/definitions/UpdateTask' }
     }
     #swagger.responses[204] = { description: 'No Content' }
     #swagger.responses[400] = { description: 'Invalid ID/body' }
     #swagger.responses[404] = { description: 'Not found' } */
  ctrl.updateTask
);

// DELETE
router.delete('/:id',
  /* #swagger.tags = ['Tasks']
     #swagger.summary = 'Delete a task'
     #swagger.parameters['id'] = { in: 'path', required: true, type: 'string' }
     #swagger.responses[200] = { description: 'Deleted' }
     #swagger.responses[400] = { description: 'Invalid ID' }
     #swagger.responses[404] = { description: 'Not found' } */
  ctrl.deleteTask
);

module.exports = router;
