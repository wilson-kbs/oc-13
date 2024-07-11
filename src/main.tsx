import React from "react";
import ReactDOM from "react-dom/client";
import "./main.css";
import { router } from "./router.tsx";
import { RouterProvider } from "react-router-dom";
import { store } from "./app/store";
import { Provider } from "react-redux";
import AuthLoader from "src/components/AuthLoader.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthLoader>
        <RouterProvider router={router} />
      </AuthLoader>
    </Provider>
    ,
  </React.StrictMode>,
);
