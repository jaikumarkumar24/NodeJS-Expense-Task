import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

// Swagger definition
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Expenses App API with Swagger",
    version: "1.0.0",
    description:
      "A simple Login Register & Expenses CRUD API application made with Express and documented with Swagger",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Server",
    },
  ],
};

// Options for the swagger docs
const options = {
  swaggerDefinition,
  apis: ["./api_documentation/*.js"], // Path to the API docs
  // apis:['./routes/*.js']
};

// Initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
