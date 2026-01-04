import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
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
      examples: true,
    },
    '@tanstack/react-query',
  ],
}
