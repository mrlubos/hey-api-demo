# hey-api-demo

A React application demonstrating the PetStore API using modern tooling:
- **@hey-api/openapi-ts** for API client generation
- **TanStack Query** for data fetching and caching
- **Valibot** for schema validation
- **Shadcn UI** for components
- **Tailwind CSS** for styling
- **Oxlint** for linting

![PetStore API Demo](https://github.com/user-attachments/assets/0cee0a19-307b-449a-a942-d2af09f1d3ba)

## Features

This demo implements several PetStore API endpoints:

- **List Available Pets** - Fetches and displays pets with "available" status
- **Add New Pet** - Creates a new pet in the store
- **Find Pet by ID** - Searches for a specific pet by its ID

## Setup

```bash
# Install dependencies
npm install

# Generate API client from OpenAPI spec
npm run generate:client
```

## Development

```bash
# Start development server
npm run dev

# Run linter
npm run lint

# Build for production
npm run build

# Preview production build
npm run preview
```

## OpenAPI Configuration

The API client is generated from the PetStore OpenAPI specification. Configuration is in `openapi-ts.config.ts`:

```typescript
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
```

The SDK is instantiated as a singleton in `src/api.ts` and used throughout the application.

## Tech Stack

- **React 19** with TypeScript
- **Vite** for build tooling
- **TanStack Query v5** for server state management
- **@hey-api/openapi-ts** for type-safe API client generation
- **Tailwind CSS v4** for styling
- **Shadcn UI** components
- **Oxlint** for fast linting

## Project Structure

```
src/
├── client/          # Generated API client
├── components/      # UI components
│   └── ui/         # Shadcn UI components
├── lib/            # Utility functions
├── App.tsx         # Main application
└── main.tsx        # Entry point
```

