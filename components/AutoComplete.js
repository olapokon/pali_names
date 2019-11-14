function AutoComplete({
  autoCompleteData,
  handleAutoCompleteSearch,
  specialCharacters,
  selectedAutoCompleteItem
}) {
  function handleClick(event) {
    const name = event.target.getAttribute("name");
    handleAutoCompleteSearch(name);
  }

  return (
    <div className="autoComplete">
      {specialCharacters}
      <ul id="autoCompleteResults">
        {autoCompleteData.length > 0 &&
          autoCompleteData.map((name, index) => {
            return (
              <li
                key={name.id}
                className={selectedAutoCompleteItem === index && "selected"}
                name={name.name}
                onClick={handleClick}
              >
                {name.name}
              </li>
            );
          })}
      </ul>
      <style jsx>{`
        .autoComplete {
          position: absolute;
          z-index: 90;
          top: 100%;
          left: 0;
          right: 0;
          background-color: #fff;
          color: black;
          font-size: 1.8rem;
          border: 1px solid gray;

          display: flex;
          flex-direction: column;
        }

        .selected {
          background-color: gray;
          color: white;
        }

        li {
          padding: 0.5rem;
        }

        li:hover {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export default AutoComplete;
