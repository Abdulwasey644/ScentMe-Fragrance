import React from "react";
import Copyright from "./Copyright";
import logo from "../scent-me.png";
import List from "./List";

export default function Footer() {
  return (
    <footer className="bg-dark text-light pt-5 pb-3">
      <div className="container">
        <div className="row g-3">
          <div className="col-3">
            <img src={logo} alt="logo here" style={{ width: "120px" }} />
            <h4>Get More Updates</h4>
            <form className="my-2">
              <div className="row"></div>
              <div className="col-12">
                <input
                  className="form-control"
                  type="email"
                  placeholder="Your email address"
                />
              </div>
              <div className="col-12">
                <button
                  className="mt-2 btn btn-outline-warning w-100"
                  type="submit"
                  style={{ borderRadius: "5px" }}
                >
                  Send
                </button>
              </div>
            </form>
          </div>
          <div className="col-3 d-flex flex-column">
            <div>
              <h2 className="px-4 text-left">Services</h2>
            </div>
            <div>
              <List
                className="d-flex flex-column text-left my-2"
                listItems={[
                  // { text: "Help" },
                  // { text: "Track Order" },
                  // { text: "Track Order" },
                  // { text: "Change Location" },
                  { text: "Home", link : "/" },
                  { text: "Cart" ,link : "/cart"},
                  { text: "Wishlist", link : "/wishlist" },
                  { text: "FAQ's", link :"/faq" },
                ]}
              />
            </div>
          </div>
          <div className="col-3 d-flex flex-column">
            <div>
              <h2 className="px-4 text-left">Quick Shop</h2>
            </div>
            <div>
              <List
                className="d-flex flex-column text-left my-2"
                listItems={[
                  // { text: "Men's" , link : "/"},
                  // { text: "Women's", link : "/"},
                  // { text: "Unisex", link : "/"},
                  // { text: "Top Sellers", link : "/topsellers"},
                  { text: "Brands", link : "/brands"},
                ]}
              />
            </div>
          </div>
          {/* <div className="d-flex flex-column">
              <div>
                <h2 className="px-4 text-left">Policies</h2>
              </div>
              <div>
                <List
                  className="d-flex flex-column text-left my-2"
                  listItems={[
                    { text: "Term and Conditions" },
                    { text: "Privacy Policy" },
                    { text: "Refund Policy" },
                    { text: "Payment Method" },
                  ]}
                />
              </div>
            </div> */}
          <div className="col-3 d-flex flex-column">
            <div>
              <h2 className="px-4 text-left">Contact Us</h2>
            </div>
            <div>
              <List
                className="d-flex flex-column text-left my-2"
                listItems={[
                  { text: "Shop 224, Main Market, Wahdat Road" },
                  { text: "info@scentsme.com" },
                  { text: "+92 306 1211871" },
                ]}
              />
            </div>
          </div>
        </div>
        <div>
          <hr />
        </div>
        <Copyright />
      </div>
    </footer>
  );
}
