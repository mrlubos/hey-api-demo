export default {
  input: './petstore-openapi.yaml',
  output: './src/client',
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
        containerName: true, // Use container name in the SDK
        methods: 'instance', // Use instance methods instead of static
      },
    },
    // Generate TanStack Query hooks for data fetching
    '@tanstack/react-query',
  ],
}
