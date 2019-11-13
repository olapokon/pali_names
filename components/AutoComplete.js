function AutoComplete({ autoCompleteData, handleAutoCompleteSearch }) {
  function handleClick(event) {
    const name = event.target.getAttribute("name");
    console.log("running autocomplete select: " + name);
    handleAutoCompleteSearch(name);
  }

  return (
    <div className="autoComplete">
      <ul>
        {autoCompleteData.length > 0 &&
          autoCompleteData.slice(0, 10).map(name => {
            return (
              <li key={name.id} name={name.name} onClick={handleClick}>
                {name.name}
              </li>
            );
          })}
      </ul>
      <style jsx>{`
        .autoComplete {
          position: absolute;
          z-index: 90;
          top: 4.8rem;
          left: 0;
          width: 25rem;
          background-color: #fff;
          color: black;
          font-size: 1.8rem;
          border: 1px solid gray;

          display: flex;
          flex-direction: column;
        }

        li {
          padding: 0.5rem;
        }

        li:hover {
          background-color: gray;
          color: white;
        }
      `}</style>
    </div>
  );
}

export default AutoComplete;
