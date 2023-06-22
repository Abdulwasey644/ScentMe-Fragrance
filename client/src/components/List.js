import React from "react";
import { Link } from "react-router-dom"

export default function List(props) {
  return (
    <ul className={props.className} style={props.style} id={props.id}>
      {props.listItems.map((item, index) => (
        <li className={item.class} id={item.id} style={item.style} key={index}>
          {item.link !== undefined ? (
            <Link to={item.link} className={item.linkClass} id={item.linkId} style={item.linkStyle}>
              {item.icon !== undefined ? (
                <img
                  className={item.iconClass}
                  style={item.iconStyle}
                  src={item.icon}
                  alt="item icon"
                />
              ) : (
                <i className={item.iconClass} style={item.iconStyle}></i>
              )}
              {item.text}
            </Link>
          ) : (
            <span>
              {" "}
              {item.icon !== undefined ? (
                <img
                  className={item.iconClass}
                  style={item.iconStyle}
                  src={item.icon}
                  alt="item icon"
                />
              ) : (
                <i className={item.iconClass} style={item.iconStyle}></i>
              )}
              {item.text}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
