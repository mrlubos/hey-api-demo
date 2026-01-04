export default {
  input: './petstore-openapi.yaml',
  output: {
    path: './src/client',
    // Generate a copy of the input source with code examples attached
    source: true,
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
      // Enable code examples for SDK operations
      examples: true,
    },
    // Generate TanStack Query hooks for data fetching
    '@tanstack/react-query',
  ],
}
