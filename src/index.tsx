import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { HashRouter } from "react-router-dom";
import "./index.scss";
import App from "./App";
// import "./test";
console.log(document.getElementById("root"));

const render = (App: any) => {
  ReactDOM.render(
    <AppContainer>
      <HashRouter>
        <App num={158} />
      </HashRouter>
    </AppContainer>,
    document.getElementById("root")
  );
};
render(App);

if (module.hot) {
  module.hot.accept("./App.tsx", () => {
    const NextApp = require("./App.tsx").default;
    render(NextApp);
  });
}

// ReactDOM.render(<App num={158} />, document.getElementById("root"));

// 判断该浏览器支不支持 serviceWorker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("service-worker registed success" /* registration */);
      })
      .catch(error => {
        console.log("service-worker registed error" /* error */);
      });
  });
}
