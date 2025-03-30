# Hotel Reservation Management System

A dashboard for managing hotel reservations implementing all the required functionality from the recruitment task.

## Features

The application allows:

- Viewing reservations grouped by status
- Adding new reservations with Reserved or Due In status
- Deleting reservations
- Editing guest information (for reservations with Reserved or Due In status)
- Changing reservation status according to specific business rules

## Technologies

- React
- TypeScript
- Vite
- React Router Dom
- React Hook Form + Zod (form validation)
- Vitest + React Testing Library (testing)
- Prettier (code formatting)
- ESLint (code quality)

## Getting Started

1. Clone the repository:

```bash
git clone [repository-url]
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Available Scripts

- `npm run dev` - runs the app in development mode
- `npm run build` - builds the app for production
- `npm run lint` - checks code for potential errors
- `npm test` - runs tests
- `npm run preview` - locally preview production build
- `npm run format` - formats code using Prettier

## Potential Enhancements

Future enhancements could include:

- Confirmation popup for reservation deletion
- Responsive design for mobile devices
- Extended test coverage
- Virtual rendering implementation for handling large numbers of reservations
- Filtering and sorting functionality for the reservation list
- Improved accessibility (a11y)
- Internationalization (i18n)
- Advanced loading indicators

## Author

Tomasz Smolarczyk
