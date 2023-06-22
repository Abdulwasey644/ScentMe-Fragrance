import React from "react";
import List from "./List";

export default function TopBar() {
  return (
    <>
      <div className="topbar">
        <List
          className="container d-flex flex-wrap justify-content-around py-2"
          listItems={[
            { text: "+92 300 0000000", iconClass: "ti-headphone-alt mx-2", iconStyle :{color : "#fd7e14"}},
            { text: "info@scentsme.com", iconClass: "ti-email mx-2", iconStyle :{color : "#fd7e14"}},
            { text: "Shop 224, Main Market, Wahdat Road", iconClass: "ti-location-pin mx-2", iconStyle :{color : "#fd7e14"}},
            // { text: "Daily Deals", iconClass: "ti-alarm-clock mx-2", iconStyle :{color : "#fd7e14"}},
          ]}
        />
      </div>
    </>
  );
}
