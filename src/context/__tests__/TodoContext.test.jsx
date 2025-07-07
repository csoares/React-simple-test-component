import { render, renderHook, act } from '@testing-library/react';
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { TodoProvider, useTodoContext } from '../TodoContext';

const TestComponent = () => {
  useTodoContext(); // Just call the hook to test the context error
  return null;
};

describe('TodoContext', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('throws error when useTodoContext is used outside of TodoProvider', () => {
    expect(() => render(<TestComponent />)).toThrow('useTodoContext must be used within a TodoProvider');
  });

  it('provides initial empty todos array', () => {
    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });
    expect(result.current.todos).toEqual([]);
  });

  it('loads existing todos from localStorage', () => {
    const existingTodos = [
      { id: 1, text: 'Test todo', completed: false }
    ];
    localStorage.setItem('todos', JSON.stringify(existingTodos));

    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });
    expect(result.current.todos).toEqual(existingTodos);
  });

  it('adds a new todo', () => {
    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });

    act(() => {
      result.current.addTodo('New todo');
    });

    expect(result.current.todos).toHaveLength(1);
    expect(result.current.todos[0].text).toBe('New todo');
    expect(result.current.todos[0].completed).toBe(false);
  });

  it('does not add empty todos', () => {
    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });

    act(() => {
      result.current.addTodo('  ');
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it('deletes a todo', () => {
    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });

    act(() => {
      result.current.addTodo('Test todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.deleteTodo(todoId);
    });

    expect(result.current.todos).toHaveLength(0);
  });

  it('edits a todo', () => {
    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });

    act(() => {
      result.current.addTodo('Original todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.editTodo(todoId, 'Updated todo');
    });

    expect(result.current.todos[0].text).toBe('Updated todo');
  });

  it('does not edit todo with empty text', () => {
    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });

    act(() => {
      result.current.addTodo('Original todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.editTodo(todoId, '  ');
    });

    expect(result.current.todos[0].text).toBe('Original todo');
  });

  it('toggles a todo completion status', () => {
    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });

    act(() => {
      result.current.addTodo('Test todo');
    });

    const todoId = result.current.todos[0].id;

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(true);

    act(() => {
      result.current.toggleTodo(todoId);
    });

    expect(result.current.todos[0].completed).toBe(false);
  });

  it('persists todos to localStorage', () => {
    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });

    act(() => {
      result.current.addTodo('Test todo');
    });

    const savedTodos = JSON.parse(localStorage.getItem('todos'));
    expect(savedTodos).toHaveLength(1);
    expect(savedTodos[0].text).toBe('Test todo');
  });

  it('handles localStorage errors gracefully', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});
    vi.spyOn(Storage.prototype, 'getItem').mockImplementation(() => {
      throw new Error('Storage error');
    });

    const { result } = renderHook(() => useTodoContext(), {
      wrapper: TodoProvider
    });

    expect(result.current.todos).toEqual([]);
    expect(consoleSpy).toHaveBeenCalledWith(
      'Error loading todos from localStorage:',
      expect.any(Error)
    );
  });
});