// Import necessary hooks from React
// - createContext: Creates a Context object for sharing state
// - useContext: Hook to consume a Context value
// - useState: Hook for managing component state
// - useEffect: Hook for side effects (like localStorage operations)
import { createContext, useContext, useState, useEffect } from 'react';

// Create a new Context object
// This will be used to share todo state and functions across components
const TodoContext = createContext();

// Custom hook to access the TodoContext
// This provides a convenient way for components to access the context
// and includes error handling for when it's used outside a provider
export const useTodoContext = () => {
  // Get the context value
  const context = useContext(TodoContext);
  
  // Error handling: ensure the hook is used within a TodoProvider
  if (!context) {
    throw new Error('useTodoContext must be used within a TodoProvider');
  }
  
  // Return the context value to the component
  return context;
};

// Context Provider component
// This component will wrap parts of our app that need access to the todo state
export const TodoProvider = ({ children }) => {
  // Initialize todos state with data from localStorage (if available)
  // Using a function in useState is a lazy initialization pattern
  // This is efficient because the function only runs once during initial render
  const [todos, setTodos] = useState(() => {
    try {
      // Try to load todos from localStorage
      const savedTodos = localStorage.getItem('todos');
      // Parse the JSON string or return empty array if nothing saved
      return savedTodos ? JSON.parse(savedTodos) : [];
    } catch (error) {
      // Handle any errors during loading (e.g., invalid JSON)
      console.error('Error loading todos from localStorage:', error);
      return [];
    }
  });

  // Save todos to localStorage whenever the todos state changes
  // This useEffect hook runs after every render where todos has changed
  useEffect(() => {
    try {
      // Convert todos array to JSON string and save to localStorage
      localStorage.setItem('todos', JSON.stringify(todos));
    } catch (error) {
      // Handle any errors during saving
      console.error('Error saving todos to localStorage:', error);
    }
  }, [todos]); // The dependency array ensures this only runs when todos changes

  // Function to add a new todo
  const addTodo = (text) => {
    // Trim whitespace from the input text
    const trimmedText = text.trim();
    // Only add non-empty todos
    if (trimmedText) {
      // Update todos state using the functional form of setState
      // This ensures we're working with the most current state
      setTodos(prevTodos => [
        ...prevTodos, 
        { 
          id: Date.now(), // Generate a unique ID using timestamp
          text: trimmedText, 
          completed: false 
        }
      ]);
    }
  };

  // Function to delete a todo by its ID
  const deleteTodo = (id) => {
    // Filter out the todo with the matching ID
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  // Function to edit a todo's text
  const editTodo = (id, newText) => {
    // Trim whitespace from the new text
    const trimmedText = newText.trim();
    // Only update if the new text is not empty
    if (trimmedText) {
      // Map through todos and update the one with matching ID
      setTodos(prevTodos =>
        prevTodos.map(todo =>
          todo.id === id 
            ? { ...todo, text: trimmedText } // Create a new object with updated text
            : todo // Keep other todos unchanged
        )
      );
    }
  };

  // Function to toggle a todo's completed status
  const toggleTodo = (id) => {
    // Map through todos and toggle the completed status of the matching todo
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id 
          ? { ...todo, completed: !todo.completed } // Flip the completed status
          : todo // Keep other todos unchanged
      )
    );
  };

  // Provide the context value to all children components
  return (
    <TodoContext.Provider value={{
      todos,       // The current todos array
      addTodo,     // Function to add a new todo
      deleteTodo,  // Function to delete a todo
      editTodo,    // Function to edit a todo's text
      toggleTodo   // Function to toggle a todo's completed status
    }}>
      {children}  {/* Render all child components with access to the context */}
    </TodoContext.Provider>
  );
};