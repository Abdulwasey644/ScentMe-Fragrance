import FilterItem from "./FilterItem";

export default function Filter(props) {
  const filters = [
    { id: "male", name: "Men" },
    { id: "female", name: "Women" },
    { id: "unisex", name: "Unisex" },
    { id: "< 25000", name: "< Rs. 25000" },
    { id: ">= 25000", name: ">= Rs. 25000" },
  ];

  return (
    <div className="container my-5">
      <div className="d-flex justify-content-center">
        {filters.map((item, index) => {
          return (
            <FilterItem
              className="filter px-3 py-1 mx-1 rounded"
              id={item.id}
              key={index}
              name={item.name}
              filter={props.filter}
              setFilter={props.setFilter}
            />
          );
        })}
      </div>
    </div>
  );
}
