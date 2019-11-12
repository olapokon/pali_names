import SpecialCharacters from "./SpecialCharacters";
import Info from "./Info";

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
      <div className="search-info-container">
        <input
          className="search__input"
          name="searchInput"
          autoFocus
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleChange}
          placeholder="Search"
        />
        <Info />
      </div>
      <SpecialCharacters insertSpecialCharacter={insertSpecialCharacter} />
      <input
        className="search__button"
        value="Search"
        type="submit"
        onClick={handleSubmit}
      />
      <style jsx>{`
        .search {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .search-info-container {
          position: relative;
        }

        .search__input {
          box-sizing: inherit;
          width: 25rem;
          padding: 0.5rem 1rem;
          font-size: 3rem;
        }

        .search__input:focus {
          box-shadow: 0 0 0.5rem fuchsia;
          border: 0.1rem solid fuchsia;
        }

        .search__button {
          font-size: 3rem;
          margin-top: 1rem;
          cursor: pointer;
          color: #6807f9;
          border: none;
          border-bottom: 0.3rem solid #6807f9;
          background-color: #fff;
          padding: 0.5rem 0.6rem 0.1rem 0.6rem;
        }

        .search__button:hover {
          background-color: #ffffb3;
        }

        .search__button:focus {
          outline: none;
        }
      `}</style>
    </form>
  );
}

export default Search;
