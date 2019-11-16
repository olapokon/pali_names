import { useState, useRef, useEffect } from "react";
import useHandleClickOutside from "../lib/useHandleClickOutside";
import useKeyboardNavigation from "../lib/useKeyboardNavigation";
import SpecialCharacters from "./SpecialCharacters";
import Info from "./Info";
import AutoComplete from "./AutoComplete";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

function Search({ handleSearch, updateAutoComplete, autoCompleteData }) {
  const [input, setInput] = useState("");
  const [selectedAutoCompleteItem, setSelectedAutoCompleteItem] = useState(
    null
  );

  const inputRef = useRef(null);
  const searchContainerRef = useRef(null);

  useHandleClickOutside(searchContainerRef, handleBlur);

  function setSelected(index) {
    setSelectedAutoCompleteItem(index);
    setInput(autoCompleteData[index].name);
  }

  useKeyboardNavigation(
    autoCompleteData,
    selectedAutoCompleteItem,
    setSelected,
    handleBlur
  );

  function handleChange(event) {
    const { value } = event.target;
    setSelectedAutoCompleteItem(null);
    updateAutoComplete(value);
    setInput(value);
  }

  function handleBlur() {
    updateAutoComplete("", true);
    setSelectedAutoCompleteItem(null);
  }

  function insertSpecialCharacter(specialCharacter) {
    let newInput;
    let cursorPosition;
    let highLightedText = window.getSelection().toString();

    // replace highlighte text, if any
    if (highLightedText) {
      newInput = input.replace(highLightedText, specialCharacter);
      // enter the character in the position of the cursor
    } else {
      cursorPosition = inputRef.current.selectionStart;
      newInput =
        input.slice(0, cursorPosition) +
        specialCharacter +
        input.slice(cursorPosition);
    }
    setSelectedAutoCompleteItem(null);
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
    setSelectedAutoCompleteItem(null);
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
          list="autoCompleteResults"
        />
        <button className="search__button" type="submit" onClick={handleSubmit}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <Info />
        {autoCompleteData.length > 0 && (
          <AutoComplete
            autoCompleteData={autoCompleteData}
            handleAutoCompleteSearch={handleAutoCompleteSearch}
            specialCharacters={
              <SpecialCharacters
                insertSpecialCharacter={insertSpecialCharacter}
              />
            }
            selectedAutoCompleteItem={selectedAutoCompleteItem}
          />
        )}
      </div>
      <SpecialCharacters insertSpecialCharacter={insertSpecialCharacter} />
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
        }

        .search__input:focus {
          box-shadow: 0 0 0.5rem fuchsia;
          outline: 0.2rem solid fuchsia;
        }

        .search__button {
          font-size: 3.6rem;
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
