function AutoComplete() {
  return (
    <div className="autoComplete">
      <style jsx>{`
        .autoComplete {
          position: absolute;
          z-index: 90;
          bottom: 0;
          left: 0;
          width: 25rem;
          height: 30rem;
          padding: 1rem;
          background-color: coral;
          color: #fff;
          font-size: 1.5rem;

          display: flex;
          flex-direction: column;
        }
        }
      `}</style>
    </div>
  );
}

export default AutoComplete;
