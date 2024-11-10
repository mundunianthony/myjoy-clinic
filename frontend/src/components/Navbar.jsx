import React, { useContext, useState } from "react";
import { assets } from "../assets/assets";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUserDoctor,
  faInfoCircle,
  faEnvelope,
  faSignInAlt,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    localStorage.removeItem("token");
    setToken(false);
    navigate("/login");
  };

  const activeClass = "text-primary border-b-2 border-primary"; // Active style

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-[#ADADAD]">
      <img
        onClick={() => navigate("/")}
        className="w-44 cursor-pointer"
        src={assets.logo}
        alt="Logo"
      />
      <ul className="md:flex items-start gap-5 font-medium hidden">
        <NavLink to="/" className={({ isActive }) => isActive ? activeClass : ""}>
          <li className="py-1 flex items-center">
            <FontAwesomeIcon icon={faHome} className="mr-1 text-blue-500" /> HOME
          </li>
        </NavLink>
        <NavLink to="/doctors" className={({ isActive }) => isActive ? activeClass : ""}>
          <li className="py-1 flex items-center">
            <FontAwesomeIcon icon={faUserDoctor} className="mr-1 text-green-500" /> ALL DOCTORS
          </li>
        </NavLink>
        <NavLink to="/about" className={({ isActive }) => isActive ? activeClass : ""}>
          <li className="py-1 flex items-center">
            <FontAwesomeIcon icon={faInfoCircle} className="mr-1 text-yellow-500" /> ABOUT
          </li>
        </NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? activeClass : ""}>
          <li className="py-1 flex items-center">
            <FontAwesomeIcon icon={faEnvelope} className="mr-1 text-red-500" /> CONTACT
          </li>
        </NavLink>
      </ul>

      <div className="flex items-center gap-4">
        {token && userData ? (
          <div className="flex items-center gap-2 cursor-pointer group relative">
            <img className="w-8 rounded-full" src={userData.image} alt="User" />
            <div className="absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block">
              <div className="min-w-48 bg-gray-50 rounded flex flex-col gap-4 p-4">
                <p onClick={() => navigate("/my-profile")} className="hover:text-black cursor-pointer">
                  My Profile
                </p>
                <p onClick={() => navigate("/my-appointments")} className="hover:text-black cursor-pointer">
                  My Appointments
                </p>
                <p onClick={logout} className="hover:text-black cursor-pointer">
                  Logout
                </p>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="bg-primary text-white px-8 py-3 rounded-full font-light hidden md:block"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="mr-1" /> Sign Up
          </button>
        )}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden"
          src={assets.menu_icon}
          alt="Menu"
        />

        {/* ---- Mobile Menu ---- */}
        <div
          className={`md:hidden ${
            showMenu ? "fixed w-full" : "h-0 w-0"
          } right-0 top-0 bottom-0 z-20 overflow-hidden bg-white transition-all`}
        >
          <div className="flex items-center justify-between px-5 py-6">
            <img src={assets.logo} className="w-36" alt="Logo" />
            <img
              onClick={() => setShowMenu(false)}
              src={assets.cross_icon}
              className="w-7"
              alt="Close"
            />
          </div>
          <ul className="flex flex-col items-center gap-2 mt-5 px-5 text-lg font-medium">
            <NavLink onClick={() => setShowMenu(false)} to="/" className={({ isActive }) => isActive ? activeClass : ""}>
              <p className="px-4 py-2 rounded-full inline-block">
                <FontAwesomeIcon icon={faHome} className="mr-1 text-blue-500" /> HOME
              </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/doctors" className={({ isActive }) => isActive ? activeClass : ""}>
              <p className="px-4 py-2 rounded-full inline-block">
                <FontAwesomeIcon icon={faUserDoctor} className="mr-1 text-green-500" /> ALL DOCTORS
              </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/about" className={({ isActive }) => isActive ? activeClass : ""}>
              <p className="px-4 py-2 rounded-full inline-block">
                <FontAwesomeIcon icon={faInfoCircle} className="mr-1 text-yellow-500" /> ABOUT
              </p>
            </NavLink>
            <NavLink onClick={() => setShowMenu(false)} to="/contact" className={({ isActive }) => isActive ? activeClass : ""}>
              <p className="px-4 py-2 rounded-full inline-block">
                <FontAwesomeIcon icon={faEnvelope} className="mr-1 text-red-500" /> CONTACT
              </p>
            </NavLink>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
