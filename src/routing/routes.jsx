import { createBrowserRouter } from "react-router-dom";
import Complaints from "../components/Complaints";
import Layout from "../pages/Layout";
import HomePage from "../pages/HomePage";
import ComplaintView from "../components/ComplaintView";
import Users from "../components/User";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      { path: "/complaints", element: <Complaints /> },
      { path: "/complaints/:id", element: <ComplaintView /> },
      { path: "/users", element: <Users /> },
    ],
  },
]);
export default router;
