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
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT", // optional, but nice to show in Swagger UI
        },
      },
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
        Course: {
          type: "object",
          required: ["title", "description", "instructor", "price", "duration"],
          properties: {
            title: {
              type: "string",
              example: "Mastering Node.js",
            },
            description: {
              type: "string",
              example: "Learn how to build backend applications with Node.js",
            },
            instructor: {
              type: "string",
              example: "Omar Magdy",
            },
            price: {
              type: "number",
              example: 120,
            },
            duration: {
              type: "string",
              example: "10 weeks",
            },
            image: {
              type: "string",
              example: "https://example.com/nodejs-course.jpg",
            },
            category: {
              type: "string",
              enum: ["Programming", "Design", "Marketing", "Business", "Other"],
              example: "Programming",
            },
            createdAt: {
              type: "string",
              format: "date-time",
              example: "2025-08-16T12:34:56.000Z",
            },
          },
        },
        PromoCode: {
          type: "object",
          required: ["code", "discount", "user", "expiresAt"],
          properties: {
            code: {
              type: "string",
              example: "SAVE20",
            },
            discount: {
              type: "number",
              example: 20,
            },
            user: {
              type: "string",
              description:
                "MongoDB ObjectId of the user this promo is assigned to",
              example: "64a12345f3a12ef456789124",
            },
            expiresAt: {
              type: "string",
              format: "date-time",
              example: "2025-12-31T23:59:59.000Z",
            },
            used: {
              type: "boolean",
              example: false,
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./Swagger/*.js"],
};

module.exports = swaggerOptions;
