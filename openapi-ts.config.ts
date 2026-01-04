import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig } from '@hey-api/openapi-ts';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  input: './petstore-openapi.yaml',
  output: {
    path: './src/client',
    source: {
      path: path.resolve(__dirname, 'api-reference'),
      fileName: 'openapi',
    },
  },
  plugins: [
    '@hey-api/typescript',
    '@hey-api/client-fetch',
    {
      name: '@hey-api/sdk',
      operations: {
        strategy: 'single',
        containerName: 'PetStore',
        methods: 'instance',
      },
      examples: {
        importSetup: ({ $, node }) => $.new(node.name),
        moduleName: '@petstore/client',
        payload(operation, ctx) {
          const { $ } = ctx;
          if (operation.operationId === 'addPet') {
            return $.object().pretty()
              .prop('name', $.literal('Fluffy'))
              .prop('id', $.literal(0))
              .prop('status', $.literal('available'))
              .prop('photoUrls', $.array($.literal('string')))
              .prop('tags', $.array($.object().pretty().prop('id', $.literal(0)).prop('name', $.literal('string'))))
              .prop('category', $.object().pretty().prop('id', $.literal(0)).prop('name', $.literal('default')));
          }
          if (operation.operationId === 'findPetsByStatus') {
            return $.object().pretty().prop('status', $.literal('available'));
          }
          if (operation.operationId === 'getPetById') {
            return $.object().pretty().prop('petId', $.literal(1234));
          }
        },
        setupName: 'client',
      },
    },
    '@tanstack/react-query',
  ],
});
