import React, { useEffect, useState } from "react";
import { Link, redirect } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import classes from "./Header.module.css";
import BR from "../../tools/translation/BR.png";
import IL from "../../tools/translation/IL.png";
import US from "../../tools/translation/US.png";

import { setLocalStorage } from "../../tools/commonHelpers";

const Header = () => {
  const [language, setLanguage] = useState();

  let filteredLang = ["IL", "US", "BR"].filter((lang) => lang !== language);

  useEffect(() => {
    const langugeSet = setLocalStorage("language", { lang: "IL" }, false);
    setLanguage(langugeSet ? langugeSet.lang : "IL");

    if (langugeSet && langugeSet.lang === "IL") {
      import(".././/../tools/translation/bodyRtl.css");
    }

    //load translation
    import("../../tools/translation/US.js").then((res) => {
      setLocalStorage("language", { dictionary: res.Languge }, false);
    });
  }, []);

  useEffect(() => {
    if (language) {
      setLocalStorage("language", { lang: language }, true);
      //load translation
      import(`../../tools/translation/${language}.js`).then((res) => {
        setLocalStorage("language", { dictionary: res.Languge }, true);
      });

      if (language === "IL") {
        import(".././/../tools/translation/bodyRtl.css");
        redirect("..");
      } else {
        import(".././/../tools/translation/bodyLtr.css");
        redirect("..");
      }
    }
  }, [language]);

  const handleLanguageChange = (event) => {
    setLanguage(event.target.alt);
  };

  return (
    <header className={classes.header}>
      <div className={classes["header-container"]}>
        {/* Logo */}
        <Link to={"/"} className={classes.logo}>
          <img src="/Logo/logo.webp" alt="BikeMate Logo" />
          <h1 className={classes["app-name"]}>BikeMate</h1>
        </Link>
        <Link to={"/auth"}>
          <p>Auth</p>
        </Link>

        {/*language */}
        <Dropdown className="langDDl d-inline-block">
          <Dropdown.Toggle variant="none" id="dropdown-basic">
            <img
              width={25}
              alt="Language"
              src={language === "IL" ? IL : language === "BR" ? BR : US}
            />
          </Dropdown.Toggle>

          <Dropdown.Menu className="w-10">
            {filteredLang.map((l) => (
              <Dropdown.Item key={l} href="#">
                <img
                  width={25}
                  alt={l}
                  src={l === "BR" ? BR : l === "IL" ? IL : US}
                  // src={import(`../../tools/translation/${l}.png`).then(
                  //   (img) => {
                  //     return img.default;
                  //   }
                  // )}
                  onClick={handleLanguageChange}
                />
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>
        <div>{process.env.NODE_ENV}</div>
        <div className={classes.lang}></div>
      </div>
    </header>
  );
};

export default Header;
