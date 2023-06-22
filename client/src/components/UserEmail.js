import React from "react";

export default function UserEmail() {
  return (
    <>
      <section className="shop-newsletter section">
        <div className="container">
          <div className="inner-top">
            <div className="row">
              <div className="col-lg-8 offset-lg-2 col-12">
                <div className="inner">
                  <h4>Newsletter</h4>
                  <p>
                    Subscribe to our newsletter and get <span>10%</span> off
                    your first purchase
                  </p>
                  <form>
                    {/* <form action="mail/mail.php" method="get" target="_blank" className="newsletter-inner"> */}
                    <input
                      name="EMAIL"
                      placeholder="Your email address"
                      required=""
                      type="email"
                    />
                    <button className="btn">Notify!</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
