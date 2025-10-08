// src/utils/errorUtils.js
/**
 * Utilitários para tratamento centralizado de erros
 */

/**
 * Classe personalizada para erros da aplicação
 */
export class AppError extends Error {
  constructor(message, code = 'UNKNOWN_ERROR', context = {}) {
    super(message);
    this.name = 'AppError';
    this.code = code;
    this.context = context;
    this.timestamp = new Date().toISOString();
  }
}

/**
 * Tratador centralizado de erros
 */
export class ErrorHandler {
  static instance = null;
  
  constructor() {
    if (ErrorHandler.instance) {
      return ErrorHandler.instance;
    }
    ErrorHandler.instance = this;
    this.errorQueue = [];
    this.maxErrors = 50;
  }

  /**
   * Log de erro com contexto
   * @param {Error|AppError} error - Erro ocorrido
   * @param {Object} context - Contexto adicional
   */
  logError(error, context = {}) {
    const errorData = {
      message: error.message,
      stack: error.stack,
      code: error.code || 'UNKNOWN_ERROR',
      context: { ...error.context, ...context },
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    // Add to queue
    this.errorQueue.push(errorData);
    
    // Maintain queue size
    if (this.errorQueue.length > this.maxErrors) {
      this.errorQueue.shift();
    }

    // Log in development
    if (process.env.NODE_ENV === 'development') {
      console.error('🚨 Application Error:', errorData);
    }

    // In production, you could send to error tracking service
    // e.g., Sentry, LogRocket, etc.
  }

  /**
   * Tratador para erros não capturados
   */
  setupGlobalErrorHandlers() {
    // JavaScript errors
    window.addEventListener('error', (event) => {
      this.logError(new AppError(
        event.message || 'Uncaught JavaScript error',
        'UNCAUGHT_ERROR',
        {
          filename: event.filename,
          lineno: event.lineno,
          colno: event.colno
        }
      ));
    });

    // Promise rejections
    window.addEventListener('unhandledrejection', (event) => {
      this.logError(new AppError(
        event.reason?.message || 'Unhandled Promise Rejection',
        'UNHANDLED_PROMISE',
        { reason: event.reason }
      ));
    });
  }

  /**
   * Wrapper para funções async com tratamento de erro
   * @param {Function} asyncFn - Função async
   * @param {Object} context - Contexto para logging
   */
  withErrorHandling(asyncFn, context = {}) {
    return async (...args) => {
      try {
        return await asyncFn(...args);
      } catch (error) {
        this.logError(error, context);
        throw error;
      }
    };
  }

  /**
   * React Error Boundary helper
   */
  createErrorBoundary() {
    return class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
      }

      static getDerivedStateFromError(error) {
        return { hasError: true, error };
      }

      componentDidCatch(error, errorInfo) {
        ErrorHandler.instance.logError(error, { errorInfo });
      }

      render() {
        if (this.state.hasError) {
          return this.props.fallback || (
            <div className="error-boundary">
              <h2>Something went wrong.</h2>
              <p>We're sorry for the inconvenience. Please refresh the page.</p>
            </div>
          );
        }

        return this.props.children;
      }
    };
  }
}

// Singleton instance
export const errorHandler = new ErrorHandler();

// Setup global handlers
if (typeof window !== 'undefined') {
  errorHandler.setupGlobalErrorHandlers();
}