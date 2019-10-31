function DataDisplay({ data }) {
  return (
    <div>
      <ul>
        {data.length > 0 &&
          data.map(name => (
            <li key={name.id}>
              <a href={name.link} target="_blank">
                {name.name}
              </a>
            </li>
          ))}
      </ul>
    </div>
  );
}

export default DataDisplay;
