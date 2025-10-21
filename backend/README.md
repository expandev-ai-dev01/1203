# Lista de Compras - Backend API

Backend REST API for the Lista de Compras application.

## Features

- Add items to shopping list
- Mark items as purchased
- View shopping list
- Remove items from list
- Edit list items

## Technology Stack

- **Runtime**: Node.js
- **Language**: TypeScript
- **Framework**: Express.js
- **Architecture**: REST API
- **Storage**: In-memory (no database)

## Project Structure

```
src/
├── api/                    # API controllers
│   └── v1/                 # API Version 1
│       └── internal/       # Internal endpoints
├── routes/                 # Route definitions
│   └── v1/                 # Version 1 routes
├── middleware/             # Express middleware
├── services/               # Business logic
├── utils/                  # Utility functions
├── constants/              # Application constants
└── server.ts               # Application entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

3. Create `.env` file from `.env.example`:

```bash
cp .env.example .env
```

4. Start development server:

```bash
npm run dev
```

The API will be available at `http://localhost:3000/api/v1`

## Available Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Run tests with coverage report
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint errors

## API Endpoints

All endpoints are prefixed with `/api/v1/internal`

### Health Check

- `GET /health` - Check API health status

## Environment Variables

- `NODE_ENV` - Environment (development/production)
- `PORT` - Server port (default: 3000)
- `API_VERSION` - API version (default: v1)
- `CORS_ORIGINS` - Allowed CORS origins
- `CACHE_TTL` - Cache time-to-live in seconds
- `CACHE_CHECK_PERIOD` - Cache check period in seconds

## Development Guidelines

- Follow TypeScript strict mode
- Use ESLint for code quality
- Write tests for all business logic
- Follow REST API conventions
- Use semantic commit messages

## License

ISC