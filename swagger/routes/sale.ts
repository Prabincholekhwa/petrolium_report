module.exports = {
  '/api/v1/sales': {
    get: {
      tags: ['Sales'],
      summary: 'Get All Sales',
      produces: ['application/json'],
      parameters: [
        {
          $ref: '#/components/parameters/offset'
        },
        {
          $ref: '#/components/parameters/limit'
        },
        {
          $ref: '#/components/parameters/countryId'
        },
        {
          $ref: '#/components/parameters/year'
        },
        {
          $ref: '#/components/parameters/productId'
        },
      ],
      responses: {
        200: {
          description: 'All Sales are fetched',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    $ref: '#/components/content/success',
                  },
                  message: {
                    $ref: '#/components/content/message',
                  },
                  statusCode: {
                    $ref: '#/components/content/statusCode',
                  },
                  count: {
                    $ref: '#/components/content/count'
                  },
                  data: {
                    $ref: '#/components/content/data'
                  },
                }
              }
            }
          }
        },
      },
    },
  },
  '/api/v1/sales/product-total-sell': {
    get: {
      tags: ['Sales'],
      summary: 'List the total sale of each petroleum product.',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'Total sale of each petroleum product are fetched',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    $ref: '#/components/content/success',
                  },
                  message: {
                    $ref: '#/components/content/message',
                  },
                  statusCode: {
                    $ref: '#/components/content/statusCode',
                  },
                  data: {
                    $ref: '#/components/content/data'
                  },
                }
              }
            }
          }
        },
      },
    },
  },
  '/api/v1/sales/top-countries-sell': {
    get: {
      tags: ['Sales'],
      summary: 'List the top 3 countries that have the highest and lowest total sales till date.',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'The top 3 countries that have the highest and lowest total sales till date are fetched.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    $ref: '#/components/content/success',
                  },
                  message: {
                    $ref: '#/components/content/message',
                  },
                  statusCode: {
                    $ref: '#/components/content/statusCode',
                  },
                  data: {
                    $ref: '#/components/content/data'
                  },
                }
              }
            }
          }
        },
      },
    },
  },
  '/api/v1/sales/product-average-sell': {
    get: {
      tags: ['Sales'],
      summary: 'List average sale of each petroleum product for 4 years of interval. Note: Do not count zero sale during average calulation.',
      produces: ['application/json'],
      responses: {
        200: {
          description: 'The average sale of each petroleum product for 4 years of interval are fetched.',
          content: {
            'application/json': {
              schema: {
                type: 'object',
                properties: {
                  success: {
                    $ref: '#/components/content/success',
                  },
                  message: {
                    $ref: '#/components/content/message',
                  },
                  statusCode: {
                    $ref: '#/components/content/statusCode',
                  },
                  data: {
                    $ref: '#/components/content/data'
                  },
                }
              }
            }
          }
        },
      },
    },
  }
}