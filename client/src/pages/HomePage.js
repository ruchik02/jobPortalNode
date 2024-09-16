import React from 'react'
import "../styles/HomePage.css";
import { Link } from "react-router-dom";
const HomePage = () => {
  return (
    <>
     {/* <video autoPlay muted loop id="myVideo">
        <source src="/assets/videos/bg.mp4" type="video/mp4" />
      </video> */}
      <div className="content align-items-center">
        <div className="card p-2 w-25">
          <img src="/assets/images/logo/logo1.png" alt="logo" />
          <hr />
          <div className="card-body" style={{ marginTop: "-60px" }}>
            <h5 className="card-title">Indias No #1 Carrer Platform</h5>
            <p className="card-text">
              Search and manage your jobs with ease. 
            </p>
            <div className="d-flex justify-content-between mt-2">
              <p>
                Not a user Register <Link to="/register">Here !</Link>{" "}
              </p>
              <p>
                <Link to="/login" className="myBtn">
                  Login
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomePage