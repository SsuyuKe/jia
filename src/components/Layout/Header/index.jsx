import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "@/components/Layout/Header/index.css";
import "@/components/Buttons/buttons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleUser,
  faShoppingCart,
  faGlobe,
  faSignInAlt,
  faSignOutAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { message } from "antd";
import { getToken, removeToken } from "@/utils/auth";
import { useTranslation } from "react-i18next";
import i18n from "@/i18n";
import { useUserStore } from "@/store/lang.js";

const languageList = {
  zh: "zh_TW",
  en: "en_US",
};

const Header = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { language, setLanguage } = useUserStore();

  const changeLanguage = () => {
    const newLang =
      language === languageList.zh ? languageList.en : languageList.zh;
    i18n.changeLanguage(newLang);
    setLanguage(newLang);
  };

  useEffect(() => {
    const token = getToken();
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    removeToken();
    setIsLoggedIn(false);
    setShowDropdown(false);
    message.success("您已登出，歡迎下次光臨!");
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo(0, 0);
  };

  const dropdownItem =
    "block px-4 py-2 text-base text-white hover:text-main-color-yellow hover:underline hover:decoration-main-color-yellow cursor-pointer w-full text-left transition-all duration-500 ease-in-out";

  return (
    <div className="header fixed top-0 left-0 w-full z-10">
      <nav className="px-5 w-full h-24 flex justify-between items-center bg-[rgba(26,26,26,0.7)]">
        <h2 className="logo pl-[60px]">
          <button
            onClick={handleLogoClick}
            className="text-main-color-yellow no-underline font-sans font-bold text-2xl"
          >
            J I A
          </button>
        </h2>
        <ul className="nav-list flex">
          <li className="nav-item px-10 text-xl">
            <button
              onClick={() => navigate("/about")}
              className="text-white hover:text-main-color-yellow no-underline"
            >
              {t("About")}
            </button>
          </li>
          <li className="nav-item px-10 text-xl">
            <button
              onClick={() => navigate("/news")}
              className="text-white hover:text-main-color-yellow no-underline"
            >
              {t("News")}
            </button>
          </li>
          <li className="nav-item px-10 text-xl">
            <Link
              to="/booking"
              id="bookingBtn"
              className="px-5 py-2.5 bg-main-color-yellow rounded-xl font-medium text-black"
            >
              {t("Booking")}
            </Link>
          </li>
          <li className="nav-item px-10 text-xl">
            <button
              onClick={() => navigate("/menu")}
              className="text-white hover:text-main-color-yellow no-underline"
            >
              {t("Menu")}
            </button>
          </li>
          <li className="nav-item px-10 text-xl">
            <button
              onClick={() => navigate("/contact")}
              className="text-white hover:text-main-color-yellow no-underline"
            >
              {t("Contact")}
            </button>
          </li>
        </ul>
        <div className="nav-btn flex items-center">
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="icon-btn text-white text-2xl p-1.5 transition-all duration-300 ease-in-out hover:text-main-color-yellow hover:scale-110 cursor-pointer"
            >
              <FontAwesomeIcon icon={faCircleUser} />
            </button>
            {showDropdown && (
              <ul className="absolute right-0 mt-2 w-48 bg-[rgba(26,26,26,0.7)] rounded-md shadow-lg py-1 z-10">
                {isLoggedIn ? (
                  <>
                    <li>
                      <button
                        onClick={() => {
                          navigate("/member");
                          setShowDropdown(false);
                        }}
                        className={dropdownItem}
                      >
                        <FontAwesomeIcon icon={faUser} className="mr-2" />
                        {t("Member")}
                      </button>
                    </li>
                    <li>
                      <button onClick={handleLogout} className={dropdownItem}>
                        <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                        {t("Logout")}
                      </button>
                    </li>
                  </>
                ) : (
                  <li>
                    <button
                      onClick={() => {
                        navigate("/login");
                        setShowDropdown(false);
                      }}
                      className={dropdownItem}
                    >
                      <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                      {t("Login")}
                    </button>
                  </li>
                )}
              </ul>
            )}
          </div>
          <Link
            to="/shoppingCart"
            className="icon-btn text-white text-2xl p-1.5 transition-all duration-300 ease-in-out hover:text-main-color-yellow hover:scale-110 cursor-pointer"
          >
            <FontAwesomeIcon icon={faShoppingCart} />
          </Link>
          <button
            onClick={changeLanguage}
            className="icon-btn text-white text-2xl p-1.5 transition-all duration-300 ease-in-out hover:text-main-color-yellow hover:scale-110 cursor-pointer"
          >
            <FontAwesomeIcon icon={faGlobe} />
            <span className="icon-text"></span>
            {language === languageList.zh ? "En" : "繁中"}
          </button>
        </div>
      </nav>
    </div>
  );
};

export default Header;
