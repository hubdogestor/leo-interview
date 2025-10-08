// src/components/app/Timer.jsx
import React, { memo } from 'react';
import { Play, Pause, RotateCcw, Clock } from 'lucide-react';
import { Button } from '../ui/button';

/**
 * Timer component - Memoized for performance
 */
const Timer = memo(({ 
  timerSeconds, 
  isTimerRunning, 
  onToggleTimer, 
  onResetTimer, 
  formatTime 
}) => {
  return (
    <div className={`bg-white rounded-lg border border-slate-200 p-4 ${isTimerRunning ? 'timer-pulse running' : ''}`}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-slate-700">Timer</span>
        <div className="flex items-center gap-1">
          <Clock className={`w-4 h-4 ${isTimerRunning ? 'text-blue-500' : 'text-slate-500'}`} />
          <span className={`text-lg font-mono font-bold ${isTimerRunning ? 'text-blue-600' : 'text-slate-900'}`}>
            {formatTime(timerSeconds)}
          </span>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          size="sm"
          variant={isTimerRunning ? "destructive" : "default"}
          onClick={onToggleTimer}
          className="flex-1 btn-ripple micro-bounce"
          aria-label={isTimerRunning ? "Pause timer" : "Start timer"}
        >
          {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </Button>
        <Button 
          size="sm" 
          variant="outline" 
          onClick={onResetTimer} 
          className="btn-ripple micro-bounce"
          aria-label="Reset timer"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
});

Timer.displayName = 'Timer';

export default Timer;