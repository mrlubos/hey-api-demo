export default {
  input: './petstore-openapi.yaml',
  output: './src/client',
  plugins: [
    '@hey-api/typescript',
    '@hey-api/client-fetch',
    {
      name: '@hey-api/sdk',
      operations: {
        strategy: 'single',
        containerName: true,
        methods: 'instance',
      },
    },
    '@tanstack/react-query',
  ],
}
