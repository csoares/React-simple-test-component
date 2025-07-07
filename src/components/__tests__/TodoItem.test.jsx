// Import testing utilities from Vitest
// - describe: defines a test suite
// - it: defines an individual test case
// - expect: provides assertions for testing
// - beforeEach: runs before each test in the suite
// - vi: Vitest's mocking utility (similar to Jest's jest object)
import { describe, it, expect, beforeEach, vi } from 'vitest';
// Import React Testing Library utilities
// - render: renders a React component for testing
// - screen: provides methods to query the rendered component
// - fireEvent: simulates user interactions like clicks
import { render, screen, fireEvent } from '@testing-library/react';
import TodoItem from '../TodoItem';

// Create a mock todo item for testing
// This represents the props that will be passed to the TodoItem component
const mockTodo = {
  id: 1,
  text: 'Test todo',
  completed: false
};

// Mock the TodoContext module
// This is a crucial part of unit testing - we isolate the component by mocking its dependencies
// Instead of using the real context which would make this an integration test, we provide mock functions
vi.mock('../../context/TodoContext', () => ({
  // Mock the useTodoContext hook to return mock functions
  useTodoContext: () => ({
    // These mock functions (vi.fn()) can be spied on to verify they were called correctly
    toggleTodo: vi.fn(),  // Mock for toggling todo completion status
    deleteTodo: vi.fn(),  // Mock for deleting a todo
    editTodo: vi.fn()     // Mock for editing a todo's text
  }),
  // Mock the TodoProvider component to simply render its children
  // This allows us to test TodoItem in isolation without needing the actual context
  TodoProvider: ({ children }) => children
}));

// Define the test suite for TodoItem component
describe('TodoItem', () => {
  // Before each test, reset the testing environment
  beforeEach(() => {
    // Clear localStorage to prevent test pollution
    localStorage.clear();
    // Reset all mock functions to clear their call history
    vi.clearAllMocks();
  });

  // Test 1: Verify that the component renders the todo text correctly
  it('renders todo text', () => {
    // Render the TodoItem component with our mock todo
    render(<TodoItem todo={mockTodo} />);
    // Assert that the todo text is visible in the document
    // This uses RTL's screen.getByText to find text content in the rendered output
    expect(screen.getByText('Test todo')).toBeInTheDocument();
  });

  // Test 2: Verify the checkbox toggle functionality
  it('toggles todo completion status', () => {
    // Render the component and get the rerender function
    // rerender allows us to update props and simulate state changes
    const { rerender } = render(<TodoItem todo={mockTodo} />);
    
    // Find the checkbox by its role
    const checkbox = screen.getByRole('checkbox');
    
    // Verify the initial state - checkbox should not be checked
    expect(checkbox).not.toBeChecked();
    
    // Simulate a user clicking the checkbox
    fireEvent.click(checkbox);
    // Note: At this point, the toggleTodo mock function would be called
    // In a real app, this would update the todo in the context
    
    // Simulate the component receiving updated props after the context change
    // This mimics what would happen when the context updates the todo
    rerender(<TodoItem todo={{...mockTodo, completed: true}} />);
    
    // Verify the checkbox is now checked
    expect(screen.getByRole('checkbox')).toBeChecked();
  });

  // Test 3: Verify that clicking the edit button enters edit mode
  it('enters edit mode on edit button click', () => {
    // Render the component with our mock todo
    render(<TodoItem todo={mockTodo} />);
    
    // Find the edit button by its role and text content
    // The 'i' flag makes the regex case-insensitive
    const editButton = screen.getByRole('button', { name: /edit/i });
    
    // Simulate clicking the edit button
    fireEvent.click(editButton);
    
    // Verify that an input field with the todo text appears
    // getByDisplayValue finds an input element with the specified value
    expect(screen.getByDisplayValue('Test todo')).toBeInTheDocument();
  });

  // Test 4: Verify that pressing Escape cancels edit mode and reverts changes
  it('cancels edit on escape key press', () => {
    // Render the component
    render(<TodoItem todo={mockTodo} />);
    
    // Find and click the edit button to enter edit mode
    const editButton = screen.getByRole('button', { name: /edit/i });
    fireEvent.click(editButton);
    
    // Get the input field that appears in edit mode
    const editInput = screen.getByDisplayValue('Test todo');
    
    // Simulate typing in the input field to change the value
    fireEvent.change(editInput, { target: { value: 'Updated todo' } });
    
    // Simulate pressing the Escape key
    fireEvent.keyDown(editInput, { key: 'Escape' });
    
    // Verify that we're back to display mode with the original text
    expect(screen.getByText('Test todo')).toBeInTheDocument();
    
    // Verify that the input field with edited text is no longer present
    // queryByDisplayValue returns null if not found (unlike getBy which throws an error)
    expect(screen.queryByDisplayValue('Updated todo')).not.toBeInTheDocument();
  });
});