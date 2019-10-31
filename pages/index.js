import { useState } from "react";
import fetch from "isomorphic-unfetch";
import Search from "../components/Search";

function Index() {
  // const initialState = {
  //   searchInput: ""
  // };
  // const [data, setData] = useState(initialState);

  // function handleChange(event) {
  //   const { name } = event.target;
  //   const { value } = event.target;
  //   setData({
  //     ...data,
  //     [name]: value
  //   });
  // }

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
        const data = await res.json();
        if (data.error) {
          throw new Error(data.error);
        }

        console.log(data);
      } catch (error) {
        console.error(error);
      }
    }
  }

  return (
    <div className="main">
      <Search handleSearch={handleSearch} />
    </div>
  );
}

export default Index;
