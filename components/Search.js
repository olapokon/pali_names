import SpecialCharacters from "./SpecialCharacters";

import { useState } from "react";

function Search({ handleSearch }) {
  const [input, setInput] = useState("");

  const inputRef = React.createRef();

  function handleChange(event) {
    const { value } = event.target;
    setInput(value);
  }

  function insertSpecialCharacter(specialCharacter) {
    const newInput = input + specialCharacter;
    setInput(newInput);
    // return focus to the input after clicking a special character button
    inputRef.current.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSearch(input);
  }

  return (
    <form className="search">
      <input
        className="search__input"
        name="searchInput"
        autoFocus
        ref={inputRef}
        type="text"
        value={input}
        onChange={handleChange}
      />
      <SpecialCharacters insertSpecialCharacter={insertSpecialCharacter} />
      <input className="search__button" type="submit" onClick={handleSubmit} />
    </form>
  );
}

export default Search;
