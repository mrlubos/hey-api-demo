export default {
  client: 'fetch',
  input: './petstore-openapi.yaml',
  output: './src/client',
  plugins: [
    '@hey-api/typescript',
    '@hey-api/schemas',
    '@tanstack/react-query',
    '@hey-api/sdk',
  ],
}
