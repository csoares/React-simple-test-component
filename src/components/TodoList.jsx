import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import TodoItem from './TodoItem';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #202124;
  font-size: 2rem;
  margin-bottom: 1.5rem;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Input = styled.input`
  flex: 1;
  padding: 0.75rem;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const AddButton = styled.button`
  padding: 0.75rem 1.5rem;
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #1557b0;
  }
`;

const TodoListContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const TodoList = () => {
  const { todos, addTodo } = useTodoContext();
  const [newTodo, setNewTodo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newTodo.trim()) {
      addTodo(newTodo.trim());
      setNewTodo('');
    }
  };

  return (
    <Container>
      <Title>Todo List</Title>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
          data-testid="new-todo-input"
        />
        <AddButton 
          type="submit" 
          data-testid="add-todo-button"
        >
          Add
        </AddButton>
      </Form>
      <TodoListContainer>
        {todos.map(todo => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </TodoListContainer>
    </Container>
  );
};

export default TodoList;