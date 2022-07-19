import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import express from 'express'

export function swaggerSpec(app: express.Router) {
  const options = {
    swaggerDefinition: {
      openapi: '3.0.0',
      info: {
        title: 'API TIELE',
        version: '1.0.0',
        description: 'APIの説明とかを記入。',
      },
      basePath: '/api',
      consumes: ['application/json'],
      produces: ['application/json', 'text/plain'],
    },
    apis: ['./**/*.ts'],
  }

  const swagger = swaggerJSDoc(options)

  app.use('/doc', swaggerUi.serve, swaggerUi.setup(swagger))
}
