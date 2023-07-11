import React from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../contexts/Auth";

const Sidebar = ({ sidebarOpen, closeSidebar }) => {
  const { userDetails } = useAuth();
  return (
    <div
      className={sidebarOpen ? "sidebar_responsive" : "sidebar"}
      id="sidebar"
    >
      <div className="sidebar-wrapper">
        <div className="logo">
          <Link to="/home" className="simple-text">
            {userDetails?.role == "patient" ? "Patient Panel" : "Doctor Panel"}
          </Link>
        </div>
        <ul className="nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/home">
              <i class="fas fa-chart-pie"></i>
              <p>Home</p>
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/profile">
              <i className="fas fa-user-alt"></i>
              <p>User Profile</p>
            </NavLink>
          </li>
          {userDetails?.role == "patient" ? (
            <></>
          ) : (
            <li className="nav-item">
              <NavLink className="nav-link" to="/appointment-lists">
                <i className="fas fa-ticket-alt"></i>
                <p>My reservations</p>
              </NavLink>
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
