/* Run: node swagger.js */
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Tasks API',
    description: 'BYUI-style CRUD API with Google OAuth sessions'
  },
  host: 'tasks-api-5eac.onrender.com',
  schemes: ['http'],
  tags: [
    { name: 'Auth', description: 'Google OAuth 2.0 (session-based)' },
    { name: 'Tasks', description: 'Task operations (login required)' },
    { name: 'Projects', description: 'Project operations (login required)' } // NEW
  ],
  definitions: {
    Task: {
      _id: '6711d8f1d3f2b4a1c9e12345',
      title: 'Wire up OAuth',
      completed: false,
      notes: 'Finish Google login flow'
    },
    Project: {
      _id: '6711d8f1d3f2b4a1c9e54321',
      name: 'Course Final',
      description: 'Independent project with OAuth + validation',
      status: 'active',
      priority: 3,
      dueDate: '2025-11-30T00:00:00.000Z',
      tags: ['node', 'oauth', 'swagger'],
      budget: 0,
      ownerId: '6711d8f1d3f2b4a1c9e99999'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js']; // generate from entry to avoid duplicates

swaggerAutogen(outputFile, endpointsFiles, doc);

