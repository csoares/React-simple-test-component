import { useState } from 'react';
import { useTodoContext } from '../context/TodoContext';
import styled from 'styled-components';

const TodoItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  background: #f8f9fa;
  border-radius: 4px;
  gap: 1rem;
  transition: background-color 0.2s;
  
  &:hover {
    background: #f1f3f4;
  }
  
  ${props => props.$completed && `
    .todo-text {
      text-decoration: line-through;
      color: #5f6368;
    }
  `}
`;

const Checkbox = styled.input`
  width: 18px;
  height: 18px;
  cursor: pointer;
`;

const TodoText = styled.span`
  flex: 1;
  font-size: 1rem;
  color: #202124;
`;

const EditInput = styled.input`
  flex: 1;
  padding: 0.5rem;
  font-size: 1rem;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  transition: border-color 0.2s;
  
  &:focus {
    outline: none;
    border-color: #1a73e8;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  font-size: 0.875rem;
  cursor: pointer;
  transition: background-color 0.2s;
`;

const EditButton = styled(Button)`
  background-color: #f1f3f4;
  color: #1a73e8;
  
  &:hover {
    background-color: #e8f0fe;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f1f3f4;
  color: #d93025;
  
  &:hover {
    background-color: #fce8e6;
  }
`;

const TodoItem = ({ todo }) => {
  const { deleteTodo, editTodo, toggleTodo } = useTodoContext();
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleEdit = () => {
    if (editText.trim() && editText.trim() !== todo.text) {
      editTodo(todo.id, editText.trim());
    } else {
      setEditText(todo.text);
    }
    setIsEditing(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleEdit();
    } else if (e.key === 'Escape') {
      setEditText(todo.text);
      setIsEditing(false);
    }
  };

  return (
    <TodoItemContainer $completed={todo.completed}>
      <Checkbox
        type="checkbox"
        checked={todo.completed}
        onChange={() => toggleTodo(todo.id)}
      />
      {isEditing ? (
        <EditInput
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyPress}
          autoFocus
        />
      ) : (
        <TodoText
          className="todo-text"
          onDoubleClick={() => setIsEditing(true)}
        >
          {todo.text}
        </TodoText>
      )}
      <ActionsContainer>
        <EditButton
          onClick={() => setIsEditing(true)}
        >
          Edit
        </EditButton>
        <DeleteButton
          onClick={() => deleteTodo(todo.id)}
        >
          Delete
        </DeleteButton>
      </ActionsContainer>
    </TodoItemContainer>
  );
};

export default TodoItem;