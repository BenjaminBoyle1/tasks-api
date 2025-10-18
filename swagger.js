/* Run: node swagger.js */
const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Tasks API',
    description: 'CRUD API for tasks'
  },
  host: 'tasks-api-5eac.onrender.com',
  schemes: ['https'],
};

const outputFile = './swagger.json';
const endpointsFiles = ['./server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);
