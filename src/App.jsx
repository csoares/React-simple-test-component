import { TodoProvider } from './context/TodoContext';
import TodoList from './components/TodoList';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  :root {
    font-family: system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    font-weight: 400;
    font-synthesis: none;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    background-color: #f6f8fc;
    min-width: 320px;
    min-height: 100vh;
  }

  #root {
    width: 100%;
    min-height: 100vh;
    margin: 0;
    padding: 1rem;
  }

  a {
    font-weight: 500;
    color: #646cff;
    text-decoration: inherit;
  }
  
  a:hover {
    color: #535bf2;
  }

  h1 {
    font-size: 3.2em;
    line-height: 1.1;
  }

  button {
    border-radius: 8px;
    border: 1px solid transparent;
    padding: 0.6em 1.2em;
    font-size: 1em;
    font-weight: 500;
    font-family: inherit;
    cursor: pointer;
    transition: border-color 0.25s;
  }

  button:focus,
  button:focus-visible {
    outline: 4px auto -webkit-focus-ring-color;
  }
`;

const AppContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  background-color: #f6f8fc;
`;

function App() {
  return (
    <TodoProvider>
      <GlobalStyle />
      <AppContainer>
        <TodoList />
      </AppContainer>
    </TodoProvider>
  );
}

export default App;
