const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "A+ Syndrome API",
      version: "1.0.0",
      description: "API documentation for A+ Syndrome site",
    },
    components: {
      schemas: {
        User: {
          type: "object",
          properties: {
            _id: {
              type: "string",
              example: "64a12345f3a12ef456789123",
            },
            name: {
              type: "string",
              example: "Omar Magdy",
            },
            email: {
              type: "string",
              example: "omar@example.com",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2023-07-26T15:40:12.123Z",
            },
          },
        },
      },
    },
    servers: [
      {
        url: "http://localhost:5000",
      },
    ],
  },
  apis: ["./Routes/*.js"],
};
// https://a-plus-syndrome-hba3rcmvv-omdevomarmagdys-projects.vercel.app/
// http://localhost:5000

module.exports = swaggerOptions;
