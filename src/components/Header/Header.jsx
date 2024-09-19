import React, { useState } from "react";
import classes from "./Header.module.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-container"]}>
        {/* Burger Menu */}
        <div className={classes.burger} onClick={toggleMenu}>
          <div className={`${classes.line} ${menuOpen ? "open" : ""}`}></div>
          <div className={`${classes.line} ${menuOpen ? "open" : ""}`}></div>
          <div className={`${classes.line} ${menuOpen ? "open" : ""}`}></div>
        </div>

        {/* Logo */}
        <Link to={"/"} className={classes.logo}>
          <img src="/Logo/logo.webp" alt="BikeMate Logo" />
          <h1 className={classes["app-name"]}>BikeMate</h1>
        </Link>

        {/* Menu Items */}
        <nav
          className={`${classes["nav-menu"]} ${
            menuOpen ? classes["active"] : ""
          }`}
        >
          <ul>
            {/* <li>
              <a href="#home">Home</a>
            </li> */}
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#services">Services</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
