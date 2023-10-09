import fs from "fs";
import _path from "path";
import swaggerJSDoc from "swagger-jsdoc";

import { appName, environment, hostUrl } from "../config";

const baseRoutes = _path.resolve("./swagger/routes");
const getPathRoutes = (path: string) => `${baseRoutes}${path}`;

const getDocs = (basePath: string, getPath: Function) => {
  return fs.readdirSync(basePath).reduce((acc, file) => {
    const data = require(getPath(`/${file}`));
    acc = {
      ...acc,
      ...data,
    };
    return acc;
  }, {});
};

const docsSources = getDocs(baseRoutes, getPathRoutes);

const swaggerOptions: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.1",
    servers: [
      {
        url: hostUrl,
        description: "Young Innovation Petrolium Report Intern Task Assesment",
      },
    ],
    components: {
      parameters: {

        offset: {
          in: "query",
          name: "offset",
          required: false,
          default: 1,
          description: "The offset for pagination.",
          type: "number"
        },
        limit: {
          in: "query",
          name: "limit",
          required: false,
          default: 10,
          description: "The number of items per page for pagination. If a value greater than 100 is provided, the API will automatically cap the result and return a page containing only the first 100 items.",
          type: "string"
        },
        countryId: {
          in: "query",
          name: "countryId",
          required: false,
          description: "Filter results by country using its unique identifier. Optional; returns data for all countries if not specified.",
          type: "number"
        },
        year: {
          in: "query",
          name: "year",
          required: false,
          description: "Filter results by the specified year. Optional; returns data for all years if not specified.",
          type: "number"
        },
        productId:{
          in:"query",
          name:"productId",
          required: false,
          description:"Filter results by petrolium product using its unique identifier. Optional; returns data for all petrolium product if not specified.",
          type:"number"
        }
      },
      content: {

        success: {
          type: 'boolean',
          description: 'Indicates if the request was successful or not.',
        },
        message: {
          type: 'string',
          description: 'A message related to the response',
        },
        statusCode: {
          type: 'integer',
          description: 'The status code of the response.',
        },
        count: {
          type: 'integer',
          description: 'Count of documents',
        },
        data: {
          type: 'array',
          description: 'An array containing the retrieved data.',
          example: [{}, {}]
        }

      }

    },
    info: {
      title: `Api ${appName} Documentation`,
      version: "1.0.0",
    },
    paths: docsSources,
  },
  apis: [],
};

const swaggerSpec = swaggerJSDoc(swaggerOptions);

const optionsSwaggerUI = {
  explorer: true,
  swaggerOptions: {
    urls: [
      {
        url: `${hostUrl}/swagger.json`,
        name: `${environment} Server`,
      },
    ],
  },
};

export { optionsSwaggerUI, swaggerSpec };
