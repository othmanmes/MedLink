# MedLink Frontend

Responsive frontend MVP for a Tunisian medical directory. The current version uses local mock data behind asynchronous service abstractions, so the UI can move to a REST API later without changing its components.

## Local development

```sh
npm install
npm run dev
```

## Production validation

```sh
npm run build
```

## Architecture

- `src/models`: domain contracts
- `src/mocks`: local cities, specialties, and doctors
- `src/services`: asynchronous data access and external link generation
- `src/composables`: directory search state and orchestration
- `src/components`: focused reusable UI components
- `src/views`: page-level composition
