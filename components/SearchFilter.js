function SearchFilter({ setSearchFilter }) {
  function handleChange(event) {
    setSearchFilter(event.target.value);
  }

  return (
    <>
      <select name="searchFilter" onChange={handleChange}>
        <option value="substring">Substring</option>
        <option value="startswith">Starts with</option>
        <option value="endswith">Ends with</option>
        <option value="exact">Exact match</option>
      </select>
      <style jsx>{`
        select {
          background-color: #fff;
        }

        select:focus {
          outline: none;
        }
      `}</style>
    </>
  );
}

export default SearchFilter;
