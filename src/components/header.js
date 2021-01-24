import React, { useEffect, useState } from "react";
import { Wrapper, Button, Menu, MenuItem } from "react-aria-menubutton";
import { Link, navigate } from "gatsby";

const Header = ({ menus, languages, currentLocale }) => {
  const [topOfPage, setTopOfPage] = useState(true);
  const mainMenu =
    menus !== null && menus !== undefined
      ? menus.find(menu => menu.type === "primary")
      : null;
  let ticking = false;

  const languagesMenu = languages.map((edge, i) => {
    return (
      <li key={i}>
        <MenuItem
          value={i}
          className={`text-sm text-left capitalize flex flex-row justify-between items-center ${
            currentLocale == edge.node.code ? "font-bold" : ``
          }`}
        >
          {edge.node.code}
          {currentLocale == edge.node.code ? (
            <svg
              width="14"
              height="11"
              viewBox="0 0 14 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13.8911 1.86969L4.94549 10.7662L0.27002 6.11641L1.80438 4.59047L4.94549 7.71433L12.3568 0.34375L13.8911 1.86969Z"
                fill="#010101"
              />
            </svg>
          ) : (
            ``
          )}
        </MenuItem>
      </li>
    );
  });

  const languageSelect = (index, event) => {
    event.stopPropagation();
    if (typeof window !== "undefined") {
      const langKey = languages[index].node.code;
      const newUrl = window.location.pathname.replace(currentLocale, langKey);
      navigate(newUrl);
    }
  };

  const initSmoothScroll = () => {
    if (typeof window !== "undefined") {
      const SmoothScroll = require("smooth-scroll");

      const scroll = new SmoothScroll("[data-scroll]", {
        speed: 800,
        speedAsDuration: true,
        easing: "easeOutQuart",
      });
    }
  };

  const initScrollListener = () => {
    document.addEventListener("scroll", function (e) {
      if (!ticking) {
        window.requestAnimationFrame(function () {
          setTopOfPage(window.scrollY === 0);
          ticking = false;
        });
        ticking = true;
      }
    });
  };

  const toggleNav = () => {
    navMenu.classList.toggle("nav__menu--active");

    navMenuButton.classList.toggle("nav__menu-button--active");

    document.body.classList.toggle("disable-scroll");
  };
  
  const closeMenu = () => {
    if (navMenuButton.classList.contains("nav__menu-button--active")) {
      navMenuButton.classList.remove("nav__menu-button--active");

      navMenu.classList.remove("nav__menu--active");

      document.body.classList.remove("disable-scroll");
    }
  };

  useEffect(() => {
    initSmoothScroll();
    initScrollListener();
  });

  return (
    <header className="header relative flex" id="header">
      <Link to="/">
        <img width="115" height="58" src={require("assets/images/logo.svg")} alt="site logo" />
      </Link>
      {mainMenu !== null && mainMenu !== undefined && (
        <nav className="nav">
          <h2 className="hidden">Top navigation</h2>
          <ul id="nav_menu" className="nav__menu">
            {mainMenu.menuItems.map(item => (
              <li key={item.id}>
                <a href={item.url} onClick={closeMenu}>
                  {item.title}
                </a>
              </li>
            ))}
          </ul>
          <button
            id="nav_menu_button"
            className="nav__menu-button"
            aria-label="mobile menu"
            onClick={toggleNav}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </nav>
      )}

      <div className="flex flex-row">
        <Wrapper className="relative" onSelection={languageSelect}>
          <Button className="flex flex-row mt-4">
            <span className="mr-2text-sm pl-4">
              {currentLocale}
            </span>{" "}
            <img
              width="26" height="7"
              className="pr-3"
              src={require("assets/images/arrow-down.svg")}
              alt="Arrow Down"
            />
          </Button>
          <Menu
            className="absolute bg-white p-4 rounded-md shadow-md mt-2 right-0 w-40 border border-black"
            id="language-dropdown"
          >
            <ul>{languagesMenu}</ul>
          </Menu>
        </Wrapper>
      </div>
    </header>
  );
};

export default Header;
