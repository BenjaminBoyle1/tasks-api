/* Run: node swagger.js */
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Tasks API',
    description: 'CRUD API for tasks'
  },
  host: 'localhost:8080',
  schemes: ['http'],
  tags: [{ name: 'Tasks', description: 'Task operations' }],
  definitions: {
    Task: {
      _id: '6711d8f1d3f2b4a1c9e12345',
      title: 'Finish Node.js project setup',
      completed: false,
      notes: 'Initialize npm and install dependencies'
    },
    CreateTask: {
      title: 'Finish Node.js project setup',
      completed: false,
      notes: 'Initialize npm and install dependencies'
    },
    UpdateTask: {
      title: 'Finish Node.js project setup',
      completed: true,
      notes: 'Project setup complete'
    }
  }
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
