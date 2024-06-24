import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routing/routes";
import { countProvider } from "./context/context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <countProvider value={{}}>
      <RouterProvider router={router} />
    </countProvider>
  </React.StrictMode>
);
