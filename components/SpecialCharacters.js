function SpecialCharacters({ insertSpecialCharacter }) {
  function handleClick(event) {
    const { value } = event.target;
    insertSpecialCharacter(value);
  }
  return (
    <div className="specialCharacters">
      <input value="ā" type="button" onClick={handleClick} />
      <input value="ū" type="button" onClick={handleClick} />
      <input value="ī" type="button" onClick={handleClick} />
      <input value="ñ" type="button" onClick={handleClick} />
      <style jsx>{`
        .specialCharacters {
          display: flex;
          justify-content: center;
          margin-top: 0.2rem;
        }

        .specialCharacters input {
          font-size: 2rem;
          background-color: #fff;
          cursor: pointer;
          border: none;
          border-bottom: 0.3rem solid orchid;
          color: #9852f9;
          padding: 0.4rem 0.5rem 0.05rem 0.5rem;
        }

        .specialCharacters input:not(:last-child) {
          margin-right: 0.4rem;
        }

        .specialCharacters input:hover {
          background-color: #ffffb3;
        }

        .specialCharacters input:focus {
          outline: none;
        }
      `}</style>
    </div>
  );
}

export default SpecialCharacters;
