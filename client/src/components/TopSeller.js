import React from 'react'

export default function TopSeller() {
  return (
    <ol className="list-group">
      <li className="list-group-item d-flex justify-content-between align-items-start">
        <div>
          <div className="font-weight-bold display-4">Dolce & Gabbana</div>
          <span style={{ fontSize: "2.8rem" }}></span>
        </div>
        <span className="mt-3" style={{ fontSize: "1.3rem" }}>
          Sales of :
          <span
            style={{ backgroundColor: "orange" }}
            className="mx-2 p-3 badge rounded-pill text-light"
          >
           Rs. 14,000,000
          </span>
        </span>
      </li>
      <li>
      Front end
          Data dynamic
      Backend
          Order tab
          Dashboard dynamic ho.
      </li>
    </ol>
  )
}
