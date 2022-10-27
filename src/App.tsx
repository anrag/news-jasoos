import React from "react";
import "./App.css";
import Home from "./containers/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewsDetail from "./containers/DetailNews";
import AdminPanel from "./containers/admin";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/read/:detail",
    element: <NewsDetail />,
  },
  {
    path: "/admin",
    element: <AdminPanel />,
  },
]);

function App() {
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
