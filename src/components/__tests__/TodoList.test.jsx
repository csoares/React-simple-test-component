// Import testing utilities from Vitest
// - describe: defines a test suite
// - it: defines an individual test case
// - expect: provides assertions for testing
// - beforeEach: runs before each test in the suite
import { describe, it, expect, beforeEach } from 'vitest';
// Import React Testing Library utilities
// - render: renders a React component for testing
// - screen: provides methods to query the rendered component
// - fireEvent: simulates user interactions like clicks
import { render, screen, fireEvent } from '@testing-library/react';
// Import the context provider that our component depends on
import { TodoProvider } from '../../context/TodoContext';
// Import the component we're testing
import TodoList from '../TodoList';

// Helper function to render components with the TodoProvider
// This is a common testing pattern to avoid repeating the provider setup
// It makes tests more readable and maintainable
const renderWithProvider = (component) => render(
    <TodoProvider>
      {component}
    </TodoProvider>
  );

// Define the test suite for TodoList component
describe('TodoList', () => {
  // Before each test, reset the testing environment
  beforeEach(() => {
    // Clear localStorage to prevent test pollution between tests
    localStorage.clear();
  });

  // Test 1: Verify that the component renders the title correctly
  it('renders the todo list title', () => {
    // Render the TodoList component with our helper function
    renderWithProvider(<TodoList />);
    
    // Assert that the title is visible in the document
    expect(screen.getByText('Todo List')).toBeInTheDocument();
  });

  // Test 2: Verify that a new todo can be added
  it('allows adding a new todo', () => {
    // Render the component with our helper function
    renderWithProvider(<TodoList />);
    
    // Find elements by test IDs
    // Using test IDs is a good practice as it makes tests less brittle to UI changes
    const input = screen.getByTestId('new-todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    // Simulate typing in the input field
    fireEvent.change(input, { target: { value: 'New test todo' } });
    
    // Simulate clicking the add button
    fireEvent.click(addButton);

    // Find the newly added todo text and verify it exists
    const todoText = screen.getByText('New test todo');
    expect(todoText).toBeInTheDocument();
  });

  // Test 3: Verify that empty todos are not added
  it('does not add empty todos', () => {
    // Render the component
    renderWithProvider(<TodoList />);
    
    // Find the input and button elements
    const input = screen.getByTestId('new-todo-input');
    const addButton = screen.getByTestId('add-todo-button');
    
    // Count existing todos by counting checkboxes
    // This is a clever way to count todos without relying on specific text content
    const initialTodos = screen.queryAllByRole('checkbox').length;

    // Try to add a todo with only whitespace
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);

    // Count todos again after attempted addition
    const currentTodos = screen.queryAllByRole('checkbox').length;
    
    // Verify that the count hasn't changed
    expect(currentTodos).toBe(initialTodos);
  });

  // Test 4: Verify that the input field is cleared after adding a todo
  it('clears input after adding todo', () => {
    // Render the component
    renderWithProvider(<TodoList />);
    
    // Find the input and button elements
    const input = screen.getByTestId('new-todo-input');
    const addButton = screen.getByTestId('add-todo-button');

    // Simulate entering text and clicking add
    fireEvent.change(input, { target: { value: 'Test todo' } });
    fireEvent.click(addButton);

    // Verify that the input field is now empty
    // This is a good UX practice - clear the input after adding
    expect(input.value).toBe('');
  });
});