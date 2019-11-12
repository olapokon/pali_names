function ErrorMessage({ errorMessage }) {
  return (
    <div className="errorMessage">
      {errorMessage}
      <style jsx>{`
        .errorMessage {
          background-color: #dc143c;
          color: white;
          text-align: center;
          padding: 1rem 0.5rem;
          min-width: 25rem;
          margin-bottom: 0.5rem;
          font-size: 1.5rem;
        }
      `}</style>
    </div>
  );
}

export default ErrorMessage;
