import { useState } from "react";
import fetch from "isomorphic-unfetch";

import Search from "../components/Search";
import DataDisplay from "../components/DataDisplay";
import NoResults from "../components/NoResults";
import ErrorMessage from "../components/ErrorMessage";
import SearchFilter from "../components/SearchFilter";

function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoCompleteData, setAutoCompleteData] = useState([]);
  const [searchFilter, setSearchFilter] = useState("substring");

  let errorTimeout;
  let autoCompleteTimeout;

  async function handleSearch(searchInput, searchType = searchFilter) {
    setAutoCompleteData([]);
    clearTimeout(autoCompleteTimeout);

    if (!loading && searchInput.trim().length > 2) {
      try {
        setLoading(true);
        const res = await fetch("/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ searchInput, searchType })
        });
        const data = JSON.parse(await res.json());
        setLoading(false);
        if (data.error) {
          throw new Error(data.error);
        }

        // if there are no results, set data to an empty string so that
        // the 'no results' component is rendered
        data.length > 0 ? setData(data) : setData("");
      } catch (error) {
        console.error(error);
        displayError(error.message);
        setLoading(false);
      }
    } else if (!loading && searchInput.trim().length <= 2) {
      displayError("Enter 3 or more characters");
    }
  }

  function updateAutoComplete(value, blur = false) {
    clearTimeout(autoCompleteTimeout);
    if (!blur) {
      autoCompleteTimeout = setTimeout(function() {
        handleAutoCompleteSearch(value);
      }, 1000);
      // when search is unfocused, clear autocomplete
    } else {
      setAutoCompleteData([]);
    }
  }

  async function handleAutoCompleteSearch(searchInput) {
    // limt the autocomplete query to 10 results
    if (!loading && searchInput.trim()) {
      try {
        const res = await fetch("/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            searchInput,
            searchType: "startswith",
            limit: 10
          })
        });
        const data = JSON.parse(await res.json());
        if (data.error) {
          throw new Error(data.error);
        }
        // only display autocomplete data if a search is not in progress
        if (!loading) {
          data.length > 0 ? setAutoCompleteData(data) : setAutoCompleteData([]);
        }
      } catch (error) {
        console.error(error);
      }
    }
  }

  function displayError(errorMessage) {
    clearTimeout(errorTimeout);
    setError(errorMessage);
    errorTimeout = setTimeout(function() {
      setError("");
    }, 4000);
  }

  return (
    <div className="main">
      {error && <ErrorMessage errorMessage={error} />}
      <Search
        handleSearch={handleSearch}
        updateAutoComplete={updateAutoComplete}
        autoCompleteData={autoCompleteData}
      />
      <SearchFilter setSearchFilter={setSearchFilter} />
      {data ? <DataDisplay data={data} /> : <NoResults />}
      <style jsx global>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: inherit;
        }

        html {
          font-size: 62.5%;
          box-sizing: border-box;
        }

        ul {
          list-style: none;
        }
      `}</style>
      <style jsx>{`
        .main {
          display: flex;
          flex-direction: column;
          align-items: center;
          margin-top: 4rem;
        }
      `}</style>
    </div>
  );
}

export default Index;
