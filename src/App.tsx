import React, { useEffect } from "react";
import "./App.css";
import Home from "./containers/Home";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import NewsDetail from "./containers/DetailNews";
import AdminPanel from "./containers/admin";
import ReactGA from "react-ga";
// G-TNJPLYTJCW
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
  useEffect(() => {
    ReactGA.initialize("G-TNJPLYTJCW");
  }, []);
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
