import React from "react";
import List from "./List";

export default function MenuBar() {
  return (
    <div className="container">
      {/*  */}
      <List
        className="d-flex flex-wrap bg-dark text-light p-2"
        style={{ borderRadius: "20px", fontSize: "16px" }}
        listItems={[
          {
            class: "nav-item px-4",
            link: "/",
            style: { borderRight: "2px solid white" },
            linkClass: "nav-link",
            iconClass: "fa fa-home mx-2",
            iconStyle: { color: "#fd7e14" },
            text: "Home",
          },
          {
            class: "nav-item px-4",
            link: "/brands",
            style: { borderRight: "2px solid white" },
            linkClass: "nav-link",
            iconClass: "fa fa-flag mx-2",
            iconStyle: { color: "#fd7e14" },
            text: "Brands",
          },
          {
            class: "nav-item px-4",
            link: "/faq",
            style: { borderRight: "2px solid white" },
            linkClass: "nav-link",
            iconClass: "fa fa-question mx-2",
            iconStyle: { color: "#fd7e14" },
            text: "FAQ",
          },
          {
            class: "nav-item px-4",
            link: "/wishlist",
            style: { borderRight: "2px solid white" },
            linkClass: "nav-link",
            iconClass: "fa fa-star mx-2",
            iconStyle: { color: "#fd7e14" },
            text: "Wishlist",
          },
          {
            class: "nav-item px-4",
            link: "/cart",
            style: { borderRight: "2px solid white" },
            linkClass: "nav-link",
            iconClass: "fa fa-shopping-cart mx-2",
            iconStyle: { color: "#fd7e14" },
            text: "Cart",
          },
        ]}
      />
    </div>
  );
}
