import { useState, useRef } from "react";
import useHandleClickOutside from "../lib/useHandleClickOutside";
import SpecialCharacters from "./SpecialCharacters";
import Info from "./Info";
import AutoComplete from "./AutoComplete";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search({ handleSearch, updateAutoComplete, autoCompleteData }) {
  const [input, setInput] = useState("");

  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useHandleClickOutside(searchContainerRef, handleBlur);

  function handleChange(event) {
    const { value } = event.target;
    updateAutoComplete(value);
    setInput(value);
  }

  function handleBlur() {
    updateAutoComplete("", true);
  }

  function insertSpecialCharacter(specialCharacter) {
    const newInput = input + specialCharacter;
    updateAutoComplete(newInput);
    setInput(newInput);
    // return focus to the input after clicking a special character button
    inputRef.current.focus();
  }

  function handleSubmit(event) {
    event.preventDefault();
    handleSearch(input.trim());
  }

  function handleAutoCompleteSearch(input) {
    handleSearch(input, "exact");
  }

  return (
    <form className="search" ref={searchContainerRef}>
      <div className="search-info-container">
        <input
          className="search__input"
          name="searchInput"
          autoFocus
          ref={inputRef}
          type="text"
          autoComplete="off"
          value={input}
          onChange={handleChange}
          placeholder="Search"
        />
        <button
          className="search__button"
          // value="Search"
          type="submit"
          onClick={handleSubmit}
        >
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <Info />
        {autoCompleteData.length > 0 && (
          <AutoComplete
            autoCompleteData={autoCompleteData}
            handleAutoCompleteSearch={handleAutoCompleteSearch}
          />
        )}
      </div>
      <SpecialCharacters insertSpecialCharacter={insertSpecialCharacter} />
      {/* <div
        className="search__button"
        // value="Search"
        type="submit"
        onClick={handleSubmit}
      >
        <FontAwesomeIcon icon={faSearch} />
      </div> */}
      <style jsx>{`
        .search {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .search-info-container {
          position: relative;
          display: flex;
          align-items: center;
        }

        .search__input {
          width: 25rem;
          padding: 0.5rem 1rem;
          font-size: 3rem;
          margin-right: -4.7rem;
        }

        .search__input:focus {
          box-shadow: 0 0 0.5rem fuchsia;
          outline: 0.2rem solid fuchsia;
        }

        .search__button {
          font-size: 3.5rem;
          cursor: pointer;
          color: #fff;
          border: none;
          background-color: #6807f9;
          padding: 0.5rem 0.6rem 0.1rem 0.6rem;
        }

        .search__button:hover {
          background-color: fuchsia;
        }

        .search__button:focus {
          outline: none;
        }
      `}</style>
    </form>
  );
}

export default Search;
