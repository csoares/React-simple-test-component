# React Todo Application

A simple Todo application built with React and Vite, following Airbnb style guidelines.

## Features

- Add, edit, and delete todos
- Mark todos as completed
- Persistent storage using localStorage
- Responsive design with styled-components

## Technology Stack

- React 18
- Vite for fast development and building
- styled-components for component-based styling (including global styles)
- Vitest and React Testing Library for testing
- ESLint with Airbnb style rules

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)

### Installation

```bash
npm install
```

### Running the Development Server

```bash
npm run dev
```

### Running Tests

This project includes comprehensive test coverage using Vitest and React Testing Library. You have several options for running tests:

```bash
# Run tests in watch mode
npm run test

# Run tests with coverage report
npm run test:coverage

# Run tests with UI interface
npm run test:ui
```

The test suite covers:
- Component rendering and functionality
- Context provider behavior
- User interactions
- localStorage integration
- Error handling

### Linting

This project follows the Airbnb style guide for React. To check for linting issues:

```bash
npm run lint
```

To automatically fix linting issues:

```bash
npm run lint:fix
```

## Airbnb Style Guide Implementation

The project follows the [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) and [Airbnb React Style Guide](https://github.com/airbnb/javascript/tree/master/react) with the following key principles:

- Use functional components with hooks instead of class components
- Follow proper naming conventions (PascalCase for components, camelCase for variables)
- Use destructuring for props and state
- Organize imports properly
- Use arrow functions for component definitions
- Implement proper error handling
- Follow consistent code formatting

## Project Structure

```
├── src/
│   ├── components/       # React components
│   │   ├── TodoItem.jsx  # Individual todo item component
│   │   ├── TodoList.jsx  # Main todo list component
│   │   └── __tests__/    # Component tests
│   ├── context/          # React context for state management
│   │   ├── TodoContext.jsx  # Todo state management and localStorage integration
│   │   └── __tests__/      # Context tests
│   ├── App.jsx           # Main application component
│   └── main.jsx          # Application entry point
├── .eslintrc.js          # ESLint configuration
└── vitest.config.js      # Vitest configuration
```
