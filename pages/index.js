import { useState } from "react";
import fetch from "isomorphic-unfetch";

import Search from "../components/Search";
import DataDisplay from "../components/DataDisplay";
import NoResults from "../components/NoResults";

function Index() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  async function handleSearch(searchInput) {
    if (!loading && searchInput.trim().length > 2) {
      try {
        setLoading(true);
        const res = await fetch("/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ searchInput })
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
        setLoading(false);
      }
    }
  }

  return (
    <div className="main">
      <Search handleSearch={handleSearch} />
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
        }
      `}</style>
    </div>
  );
}

export default Index;
