import React from "react";

export default function header() {
  return (
    <>
      {/* header */}
      <header id="header">
        {/* header_top */}
        <div class="header_top">
          <div class="container">
            <div class="row">
              <div class="col-sm-6">
                <div class="contactinfo">
                  <ul class="nav nav-pills">
                    <li>
                      <a href="#">
                        {/* <li><i class="ti-headphone-alt"></i> +060 (800) 801-582</li> */}
                        <i class="fa fa-phone"></i> +2 95 01 88 821
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-envelope"></i> info@domain.com
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-6">
                <div class="social-icons pull-right">
                  <ul class="nav navbar-nav">
                    <li>
                      <a href="#">
                        <i class="fa fa-facebook"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-twitter"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-linkedin"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-dribbble"></i>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="fa fa-google-plus"></i>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header_top end */}
        {/* header-middle */}
        <div class="header-middle">
          <div class="container">
            <div class="row">
              <div class="col-sm-4">
                <div class="logo pull-left">
                  <a href="index.html">
                    <img src="images/home/logo.png" alt="" />
                  </a>
                </div>
                <div class="btn-group pull-right">
                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      USA
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a href="#">Canada</a>
                      </li>
                      <li>
                        <a href="#">UK</a>
                      </li>
                    </ul>
                  </div>

                  <div class="btn-group">
                    <button
                      type="button"
                      class="btn btn-default dropdown-toggle usa"
                      data-toggle="dropdown"
                    >
                      DOLLAR
                      <span class="caret"></span>
                    </button>
                    <ul class="dropdown-menu">
                      <li>
                        <a href="#">Canadian Dollar</a>
                      </li>
                      <li>
                        <a href="#">Pound</a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              <div class="col-sm-8">
                {/* <div
                  className="collapse navbar-collapse"
                  id="navbarSupportedContent"
                >
                  <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                    <li className="nav-item">
                      <a
                        className="nav-link active"
                        aria-current="page"
                        href="/"
                      >
                        Home
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        Wish List
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        Add To Cart
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        Blog
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        Help
                      </a>
                    </li>
                    <li className="nav-item">
                      <a className="nav-link" href="/">
                        {currency}
                      </a>
                    </li>
                    <li className="nav-item">
                      <select
                        className="bg-warning"
                        onChange={CurrencyHandler}
                        aria-labelledby="dropdownMenuButton"
                      >
                        <option className="" value="1">
                          USD
                        </option>
                        <option className="" value="216">
                          PKR
                        </option>
                        <option className="" value="100">
                          IND
                        </option>
                      </select>
                    </li>
                  </ul>
                </div> */}
              </div>
            </div>
          </div>
        </div>
        {/* header-middle end	 */}
        {/* header-bottom */}
        <div class="header-bottom">
          <div class="container">
            <div class="row">
              <div class="col-sm-9">
                <div class="navbar-header">
                  <button
                    type="button"
                    class="navbar-toggle"
                    data-toggle="collapse"
                    data-target=".navbar-collapse"
                  >
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                  </button>
                </div>
                <div class="mainmenu pull-left">
                  <ul class="nav navbar-nav collapse navbar-collapse">
                    <li>
                      <a href="index.html" class="active">
                        Home
                      </a>
                    </li>
                    <li class="dropdown">
                      <a href="#">
                        Shop<i class="fa fa-angle-down"></i>
                      </a>
                      <ul role="menu" class="sub-menu">
                        <li>
                          <a href="shop.html">Products</a>
                        </li>
                        <li>
                          <a href="product-details.html">Product Details</a>
                        </li>
                        <li>
                          <a href="checkout.html">Checkout</a>
                        </li>
                        <li>
                          <a href="cart.html">Cart</a>
                        </li>
                        <li>
                          <a href="login.html">Login</a>
                        </li>
                      </ul>
                    </li>
                    <li class="dropdown">
                      <a href="#">
                        Blog<i class="fa fa-angle-down"></i>
                      </a>
                      <ul role="menu" class="sub-menu">
                        <li>
                          <a href="blog.html">Blog List</a>
                        </li>
                        <li>
                          <a href="blog-single.html">Blog Single</a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a href="404.html">404</a>
                    </li>
                    <li>
                      <a href="contact-us.html">Contact</a>
                    </li>
                  </ul>
                </div>
              </div>
              <div class="col-sm-3">
                <div class="search_box pull-right">
                  <input type="text" placeholder="Search" />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* header-bottom end */}
      </header>
      {/* header end */}
    </>
  );
}
