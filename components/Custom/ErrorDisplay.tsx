const ErrorDisplay: React.FC<{ 
    message: string; 
    onRetry?: () => void 
  }> = ({ message, onRetry }) => (
    <div className="error-container">
      <p>{message}</p>
      {onRetry && (
        <button 
          onClick={onRetry} 
          className="retry-button"
        >
          Retry
        </button>
      )}
    </div>
  );