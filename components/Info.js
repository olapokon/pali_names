function Info() {
  return (
    <div className="info">
      <span className="info_icon">Info</span>
      <div className="info_popup">
        <ul>
          <li>search for strings of 3 or more characters</li>
          <li>use the buttons to enter special characters</li>
          <li>
            individual links are returned for each entry when available,
            otherwise, a link to the dictionary page
          </li>
        </ul>
      </div>
      <style jsx>{`
        .info_icon {
          position: absolute;
          top: 50%;
          right: -2.8rem;
          transform: translate(-50%, -50%);
          color: gray;
        }

        .info_popup {
          visibility: hidden;
          position: absolute;
          z-index: 100;
          top: 50%;
          right: 0;
          width: 22rem;
          padding: 1rem;
          background-color: crimson;
          color: #fff;
          border-radius: 2px;
          font-size: 1.5rem;

          display: flex;
          flex-direction: column;
        }

        .info_icon:hover + .info_popup {
          visibility: visible;
        }

        li:not(:last-child) {
          margin-bottom: 1rem;
        }
      `}</style>
    </div>
  );
}

export default Info;
