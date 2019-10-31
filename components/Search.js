import { useState } from "react";

function Search({ handleSearch }) {
  const [input, setInput] = useState("");

  function handleChange(event) {
    const { value } = event.target;
    setInput(value);
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
        type="text"
        value={input}
        onChange={handleChange}
      />
      <input className="search__button" type="submit" onClick={handleSubmit} />
    </form>
  );
}

export default Search;
