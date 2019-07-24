import React from "react";
import ReactDOM from "react-dom";
import { AppContainer } from "react-hot-loader";
import { BrowserRouter } from "react-router-dom";
import Router from "./router";
import { add } from "./math.js";

add(66);
console.log("navigator");
/* 初始化 */
renderWithHotReload(Router);

/* 热更新 */
if (module.hot) {
  module.hot.accept("./router/index.js", () => {
    const Router = require("./router/index.js").default;
    renderWithHotReload(Router);
  });
}
function renderWithHotReload(Router) {
  ReactDOM.render(
    <AppContainer>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AppContainer>,
    document.getElementById("root")
  );
}
// 判断该浏览器支不支持 serviceWorker
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then(registration => {
        console.log("service-worker registed", registration);
      })
      .catch(error => {
        console.log("service-worker registed error", error);
      });
  });
}
