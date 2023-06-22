import React from 'react'
// import mactercard from "../images/mc.png"

const mactercard = ""

export default function Copyright() {
  return (
    <>
        <div className="d-flex justify-content-between">
            <div>
                <span>Copyright &copy; 2023 Scents-Me Inc.</span> <span>All rights reserved, designed by Team Developer.</span>
            </div>
            <div>
                {/* <ul className="pull-right">
                    <a className="mx-2" href="/"><img src={mactercard} alt="payment"/></a>
                    <a className="mx-2" href="/"><img src={mactercard} alt="payment"/></a>
                    <a className="mx-2" href="/"><img src={mactercard} alt="payment"/></a>
                    <a className="mx-2" href="/"><img src={mactercard} alt="payment"/></a>
                    <a className="mx-2" href="/"><img src={mactercard} alt="payment"/></a>
                </ul> */}
            </div>
        </div>
        <a href="/" className="gotop"><i className="icon-double-angle-up"></i></a>
        {/* <script src="assets/js/jquery.js"></script>
        <script src="assets/js/bootstrap.min.js"></script>
        <script src="assets/js/jquery.easing-1.3.min.js"></script>
        <script src="assets/js/jquery.scrollTo-1.4.3.1-min.js"></script>
        <script src="assets/js/shop.js"></script> */}
    </>
  )
}
