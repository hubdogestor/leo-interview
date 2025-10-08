// src/components/common/__tests__/ErrorBoundary.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import ErrorBoundary from '../ErrorBoundary';

// Mock component que pode gerar erro
const ThrowError = ({ shouldThrow }) => {
  if (shouldThrow) {
    throw new Error('Test error');
  }
  return <div>Test Child</div>;
};

describe('ErrorBoundary', () => {
  it('should render children when there is no error', () => {
    render(
      <ErrorBoundary>
        <div>Test Child</div>
      </ErrorBoundary>
    );

    expect(screen.getByText('Test Child')).toBeInTheDocument();
  });

  it('should render error UI when there is an error', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    expect(screen.getByText('Oops! Algo deu errado')).toBeInTheDocument();
    expect(screen.getByText('Desculpe, ocorreu um erro inesperado. Você pode tentar recarregar a página.')).toBeInTheDocument();
    expect(screen.getByText('Tentar novamente')).toBeInTheDocument();
    expect(screen.getByText('Recarregar página')).toBeInTheDocument();

    consoleSpy.mockRestore();
  });

  it('should have retry functionality', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const retryButton = screen.getByText('Tentar novamente');
    expect(retryButton).toBeInTheDocument();
    
    // Verificar que o botão pode ser clicado sem erros
    expect(() => fireEvent.click(retryButton)).not.toThrow();

    consoleSpy.mockRestore();
  });

  it('should have reload functionality', () => {
    const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <ErrorBoundary>
        <ThrowError shouldThrow={true} />
      </ErrorBoundary>
    );

    const reloadButton = screen.getByText('Recarregar página');
    expect(reloadButton).toBeInTheDocument();
    
    // Verificar que o botão pode ser clicado sem erros
    fireEvent.click(reloadButton);
    expect(reloadButton).toBeInTheDocument();

    consoleSpy.mockRestore();
  });
});