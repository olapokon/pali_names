import { useState } from "react";
import fetch from "isomorphic-unfetch";

import Search from "../components/Search";
import DataDisplay from "../components/DataDisplay";

function Index() {
  const [data, setData] = useState([]);

  async function handleSearch(searchInput) {
    if (searchInput.trim().length > 2) {
      try {
        const res = await fetch("/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ searchInput })
        });
        const data = JSON.parse(await res.json());
        if (data.error) {
          throw new Error(data.error);
        }

        console.log(data);
        setData(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="main">
      <Search handleSearch={handleSearch} />
      <DataDisplay data={data} />
    </div>
  );
}

export default Index;
