import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  input: './petstore-openapi.yaml',
  output: {
    path: './src/client',
    // Generate a copy of the input source specification with code examples attached
    // This creates openapi.json in api-reference/ which Mintlify uses for API documentation
    source: {
      path: path.resolve(__dirname, 'api-reference'),
      fileName: 'openapi',
    },
  },
  plugins: [
    // Generate TypeScript types from OpenAPI schema
    '@hey-api/typescript',
    // Generate fetch client for making HTTP requests
    '@hey-api/client-fetch',
    // Generate SDK with instantiable pattern for better testability and flexibility
    {
      name: '@hey-api/sdk',
      operations: {
        strategy: 'single', // Generate a single SDK class
        containerName: 'PetStore', // Use container name in the SDK
        methods: 'instance', // Use instance methods instead of static
      },
      // Enable automatic code examples - generates x-codeSamples in openapi.json
      // These examples are automatically shown in Mintlify's API playground
      examples: true,
    },
    // Generate TanStack Query hooks for data fetching
    '@tanstack/react-query',
  ],
}
