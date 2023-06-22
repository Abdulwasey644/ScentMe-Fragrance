import React, { useEffect, useState } from "react";

export default function Brand() {
  const [brandsList, setBrandsList] = useState({});
  useEffect(() => {
    fetch("http://localhost:3001/brands")
      .then((response) => response.json())
      // .catch((err) => console.log(err))
      .then((data) => {
        console.log(data);
        setBrandsList(data);
      });
  }, []);
  return (
    <>
      {Array.isArray(brandsList)  ? (
        <ol className="list-group">
          {brandsList.map((item, index) => {
            return (
              <li
                className="list-group-item d-flex justify-content-between align-items-start"
                key={index}
              >
                <div>
                  <div className=" display-6">{item.brand}</div>
                  <span style={{ fontSize: "2.8rem" }}></span>
                </div>
                <span className="mt-3" style={{ fontSize: "1.3rem" }}>
                  Products registered :
                  <span
                    style={{ borderRadius: "50%", backgroundColor: "orange", width : "30px", height : "30px"}}
                    className="mx-2 badge text-light text-center"
                  >
                    <span>
                      {item.count}
                    </span>
                  </span>
                </span>
              </li>
            );
          })}
        </ol>
      ) : (
        <div className="container text-center text-danger">
          No Brand Found...!
        </div>
      )}
    </>
  );
}
