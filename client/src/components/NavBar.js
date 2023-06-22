import logo from "../scent-me.png";
import { Link } from "react-router-dom";
import { useState } from "react";

function NavBar(props) {
  const [inputText, setInputText] = useState("");

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container d-flex justify-content-between my-2">
          <div className="d-flex justify-content-start">
            <input
              className="form-control mx-2 px-3"
              style={{
                width: "300px",
                borderRadius: "20px",
                borderColor: "orange",
              }}
              onChange={(e) => setInputText(e.target.value)}
              value={inputText}
              type="search"
              placeholder="Search"
            />
            <button
              className="btn px-3"
              style={{
                borderRadius: "20px",
                color: "white",
                backgroundColor: "orange",
                borderColor: "orange",
              }}
              onClick={() =>
                props.setFilter((prevState) => ({
                  type: prevState.type,
                  value: inputText,
                }))
              }
            >
              Search
            </button>
          </div>
          <div className="d-flex justify-content-center px-5">
            <Link to="/">
              <img src={logo} style={{ width: "300px" }} alt="Scent-Me" />
            </Link>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
