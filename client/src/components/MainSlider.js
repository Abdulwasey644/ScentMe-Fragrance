import React from "react";
import image from "../scent-me.png";
import {Crousel} from "react-responsive-carousel";

export default function MainSlider() {
  return (
    <div className="container text-bold my-4">
      {/* slider */}
      <h2 style={{ fontSize: "60px" }}>Promotions</h2>
      <section>
      <Crousel show >
        <div>

        </div>
        <div>

        </div>
        <div>

        </div>
      </Crousel>
      {/* <section id="slider"> */}
        {/* <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div
                id="slider-carousel"
                className="carousel slide"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#slider-carousel"
                    data-slide-to="0"
                    className=""
                  ></li>
                  <li
                    data-target="#slider-carousel"
                    data-slide-to="1"
                    className=""
                  ></li>
                  <li
                    data-target="#slider-carousel"
                    data-slide-to="2"
                    className="active"
                  ></li>
                </ol>
                <div className="carousel-inner">
                  <div className="row item">
                    <div className="col-6 d-flex align-items-center">
                      <div>
                        <h1>SCENT-ME</h1>
                        <h2>FLATE 20% OFF</h2>
                        <p>
                          Big deal, limited offers, chance to get upto 20% off.
                        </p>
                        <button type="button" className="btn btn-warning get">
                          Get it now
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <img src={image} className="girl img-responsive" alt="" />
                      <img src={image} className="pricing" alt="" />
                    </div>
                  </div>
                  <div className="row item">
                    <div className="col-6 d-flex align-items-center">
                      <div>
                        <h1>SCENT-ME</h1>
                        <h2>FLATE 20% OFF</h2>
                        <p>
                          Big deal, limited offers, chance to get upto 20% off.
                        </p>
                        <button type="button" className="btn btn-warning get">
                          Get it now
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <img src={image} className="girl img-responsive" alt="" />
                      <img src={image} className="pricing" alt="" />
                    </div>
                  </div>
                  <div className="row item active">
                    <div className="col-6 d-flex align-items-center">
                      <div>
                        <h1>SCENT-ME</h1>
                        <h2>FLATE 20% OFF</h2>
                        <p>
                          Big deal, limited offers, chance to get upto 20% off.
                        </p>
                        <button type="button" className="btn btn-warning get">
                          Get it now
                        </button>
                      </div>
                    </div>
                    <div className="col-6">
                      <img src={image} className="girl img-responsive" alt="" />
                      <img src={image} className="pricing" alt="" />
                    </div>
                  </div>

                </div>

                <a
                  href="#slider-carousel"
                  className="left control-carousel hidden-xs"
                  data-slide="prev"
                >
                  <i className="fa fa-angle-left"></i>
                </a>
                <a
                  href="#slider-carousel"
                  className="right control-carousel hidden-xs"
                  data-slide="next"
                >
                  <i className="fa fa-angle-right"></i>
                </a>
              </div>
            </div>
          </div>
        </div> */}
      </section>
    </div>
  );
}
// $carousel-control-color:             $high-emphasis-inverse;
// $carousel-control-width:             15%;
// $carousel-control-opacity:           .5;
// $carousel-control-hover-opacity:     .9;
// $carousel-control-transition:        opacity .15s ease;

// $carousel-indicator-width:           30px;
// $carousel-indicator-height:          3px;
// $carousel-indicator-hit-area-height: 10px;
// $carousel-indicator-spacer:          3px;
// $carousel-indicator-opacity:         .5;
// $carousel-indicator-active-bg:       $white;
// $carousel-indicator-active-opacity:  1;
// $carousel-indicator-transition:      opacity .6s ease;

// $carousel-caption-width:             70%;
// $carousel-caption-color:             $high-emphasis-inverse;
// $carousel-caption-padding-y:         1.25rem;
// $carousel-caption-spacer:            1.25rem;

// $carousel-control-icon-width:        2rem;

// $carousel-control-prev-icon-bg:      url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#{$carousel-control-color}'><path d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/></svg>");
// $carousel-control-next-icon-bg:      url("data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='#{$carousel-control-color}'><path d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/></svg>");

// $carousel-transition-duration:       .6s;
// $carousel-transition:                transform $carousel-transition-duration ease-in-out; // Define transform transition first if using multiple transitions (e.g., `transform 2s ease, opacity .5s ease-out`)

// $carousel-dark-indicator-active-bg:  $black;
// $carousel-dark-caption-color:        $high-emphasis;
// $carousel-dark-control-icon-filter:  invert(1) grayscale(100);
