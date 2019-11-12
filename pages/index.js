import { useState } from "react";
import fetch from "isomorphic-unfetch";

import Search from "../components/Search";
import DataDisplay from "../components/DataDisplay";
import NoResults from "../components/NoResults";
import ErrorMessage from "../components/ErrorMessage";

function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [autoCompleteData, setAutoCompleteData] = useState([]);

  let errorTimeout;
  let autoCompleteTimeout;

  async function handleSearch(searchInput, searchType = "substring") {
    if (!loading && searchInput.trim().length > 2) {
      try {
        setLoading(true);
        setAutoCompleteData([]);
        window.clearTimeout(autoCompleteTimeout);

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
        displayError(error);
        setLoading(false);
      }
    } else if (!loading && searchInput.trim().length <= 2) {
      displayError("Enter 3 or more characters");
    }
  }

  function handleAutoCompleteTimeout(value) {
    window.clearTimeout(autoCompleteTimeout);
    autoCompleteTimeout = window.setTimeout(function() {
      handleAutoCompleteSearch(value);
    }, 2000);
  }

  async function handleAutoCompleteSearch(searchInput) {
    if (!loading) {
      try {
        const res = await fetch("/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ searchInput, searchType: "starts with" })
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
    window.clearTimeout(errorTimeout);
    setError(errorMessage);
    errorTimeout = window.setTimeout(function() {
      setError("");
    }, 4000);
  }

  return (
    <div className="main">
      {error && <ErrorMessage errorMessage={error} />}
      <Search
        handleSearch={handleSearch}
        handleAutoCompleteTimeout={handleAutoCompleteTimeout}
        autoCompleteData={autoCompleteData}
      />
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
