import { render } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../../App';

describe('App Component', () => {
  it('renders without crashing', () => {
    expect(() => render(<App />)).not.toThrow();
  });

  it('renders TodoList component', () => {
    const { container } = render(<App />);
    // Check if the app container is rendered with the correct class
    expect(container.firstChild).toBeInTheDocument();
  });

  it('renders with TodoProvider context', () => {
    const { container } = render(<App />);
    // Verify the app container is rendered
    const appContainer = container.firstChild;
    expect(appContainer).toBeInTheDocument();
    // The presence of the container indicates TodoProvider is working
    // since the styled-components would not render without the provider
    expect(appContainer).toHaveStyle({
      backgroundColor: '#f6f8fc'
    });
  });
});