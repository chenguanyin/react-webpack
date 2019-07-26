import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import "./index.css";
import App from "./App";
import "./test";
console.log(document.getElementById("root"));

const render = (App: any) => {
  ReactDOM.render(
    <AppContainer>
      <App num={158} />
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
        // console.log("service-worker registed", registration);
      })
      .catch(error => {
        // console.log("service-worker registed error", error);
      });
  });
}
