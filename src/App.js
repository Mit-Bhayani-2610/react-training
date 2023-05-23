import "./App.css";
import { Routes, Route, Link, BrowserRouter } from "react-router-dom";
import { globalsStyles } from "./constants";

import appStyle from "./AppStyle.module.css";
import { HomePage } from "./HomePage";
import { Apple } from "./Apple";
import { NotFound } from "./NotFound";
import Logo from "./images/logo.svg";
import { ThemeProvider } from "@emotion/react";
import { theme } from "./styles";

const App = () => (
  <>
    <ThemeProvider theme={theme}>
      {/* <img src={Logo} alt="App Logo" /> */}
      {/* <img src={`${process.env.REACT_APP_HOSTED_URL}logo192.png`} alt="App Logo" /> */}
      <BrowserRouter>
        <div className={appStyle.navbarStyle}>
          <Link
            to="/"
            style={{
              marginLeft: 5,
            }}
          >
            Home
          </Link>
          <Link
            to="/apple"
            style={{
              marginLeft: 10,
            }}
          >
            Apple
          </Link>
          <Link
            to="/applet"
            style={{
              marginLeft: 10,
            }}
          >
            Applet
          </Link>
        </div>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/apple" element={<Apple />}></Route>
          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  </>
);

export default App;
