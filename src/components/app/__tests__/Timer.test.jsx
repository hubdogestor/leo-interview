// src/components/app/__tests__/Timer.test.jsx
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Timer from '../Timer';

describe('Timer', () => {
  const defaultProps = {
    timerSeconds: 0,
    isTimerRunning: false,
    onToggleTimer: vi.fn(),
    onResetTimer: vi.fn(),
    formatTime: vi.fn((seconds) => `${Math.floor(seconds/60)}:${(seconds%60).toString().padStart(2, '0')}`)
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should render timer with correct initial state', () => {
    render(<Timer {...defaultProps} />);

    expect(screen.getByText('Timer')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Start timer' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Reset timer' })).toBeInTheDocument();
  });

  it('should display formatted time', () => {
    const props = { ...defaultProps, timerSeconds: 125 };
    render(<Timer {...props} />);

    expect(props.formatTime).toHaveBeenCalledWith(125);
  });

  it('should show pause button when timer is running', () => {
    const props = { ...defaultProps, isTimerRunning: true };
    render(<Timer {...props} />);

    expect(screen.getByRole('button', { name: 'Pause timer' })).toBeInTheDocument();
  });

  it('should call onToggleTimer when play/pause button is clicked', () => {
    render(<Timer {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Start timer' }));
    
    expect(defaultProps.onToggleTimer).toHaveBeenCalledTimes(1);
  });

  it('should call onResetTimer when reset button is clicked', () => {
    render(<Timer {...defaultProps} />);

    fireEvent.click(screen.getByRole('button', { name: 'Reset timer' }));
    
    expect(defaultProps.onResetTimer).toHaveBeenCalledTimes(1);
  });

  it('should apply running styles when timer is running', () => {
    const props = { ...defaultProps, isTimerRunning: true };
    render(<Timer {...props} />);

    // O container principal do Timer deve ter as classes timer-pulse e running
    const timerContainer = screen.getByText('Timer').closest('div').parentElement;
    expect(timerContainer).toHaveClass('timer-pulse', 'running');
  });

  it('should not re-render unnecessarily when props haven\'t changed', () => {
    const { rerender } = render(<Timer {...defaultProps} />);
    
    // Re-render with same props
    rerender(<Timer {...defaultProps} />);
    
    // Timer should be memoized and not re-render
    expect(defaultProps.formatTime).toHaveBeenCalledTimes(1);
  });
});