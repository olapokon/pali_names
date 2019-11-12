function AutoComplete({ autoCompleteData }) {
  return (
    <div className="autoComplete">
      <ul>
        {autoCompleteData.length > 0 &&
          autoCompleteData.map(name => {
            return <li key={name.id}>{name.name}</li>;
          })}
      </ul>
      <style jsx>{`
        .autoComplete {
          position: absolute;
          z-index: 90;
          top: 4.8rem;
          left: 0;
          width: 25rem;
          height: 30rem;
          padding: 1rem;
          background-color: skyblue;
          color: white;
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
