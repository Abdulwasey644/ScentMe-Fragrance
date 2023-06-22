import { useState } from "react";

export default function FilterItem(props) {
  const [isHover, setIsHover] = useState(false);

  const filterStyle = {
    fontWeight: "bold",
    outlineColor: "orange",
    border: "2px solid orange",
    backgroundColor:
      isHover || props.filter.type === props.id ? "orange" : "white",
    color: isHover || props.filter.type === props.id ? "white" : "orange",
    cursor: "pointer",
  };

  const filterHandler = () => {
    props.setFilter(prevState => ({
      type: props.filter.type === props.id ? "" : props.id,
      value: prevState.value,
    }));
  };

  return (
    <div
      className={props.className}
      id={props.id}
      style={filterStyle}
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      onClick={() => filterHandler()}
    >
      {props.name}
    </div>
  );
}











