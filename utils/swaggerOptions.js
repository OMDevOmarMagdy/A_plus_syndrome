const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "A+ Syndrome API",
      version: "1.0.0",
      description: "API documentation for A+ Syndrome site",
    },
    servers: [
      {
        url: "https://aplussyndrome-production.up.railway.app",
      },
      {
        url: "http://localhost:5000",
      },
    ],
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
        Book: {
          type: "object",
          required: ["title", "author", "summary", "cover", "price"],
          properties: {
            title: {
              type: "string",
              example: "The Art of War",
            },
            author: {
              type: "string",
              example: "Sun Tzu",
            },
            summary: {
              type: "string",
              example: "A book about military strategy.",
            },
            cover: {
              type: "string",
              example: "https://example.com/cover.jpg",
            },
            price: {
              type: "number",
              example: 19.99,
            },
          },
        },
      },
    },
  },
  apis: ["./Swagger/*.js"],
};

module.exports = swaggerOptions;
