import React from "react";
import { Link} from "react-router-dom"; 
import "./Homepage.css";

const Homepage = () => {
  return (
    <div className="home-container">
      <h1>👋 Welcome to Your Dashboard</h1>
      <p className="home-description">
        Manage posts, handle payments, and explore your application from one central place.
      </p>

      <div className="home-links">
        <Link to="/PostManager" className="home-btn posts">📝 Check Recent Posts</Link>
        <Link to="/payment" className="home-btn payment">💳 Go to Payment</Link>
      </div>
    </div>
  );
};

export default Homepage;
