


import { lazy } from "react";
import { Navigate } from "react-router-dom";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/**** Pages ***/
const Login = lazy(() => import("../auth/Login.js"))
const AssignmentForm = lazy(() => import("../views/ui/AssignmentForm.js"));
const AssignmentList = lazy(()=> import("../views/ui/Assignment.js"))
const Signup = lazy(() => import("../auth/Signup.js"))


/*****Routes******/

const ThemeRoutes = [
  { path: "/login", exact: true, element: <Login /> },
  { path: "/signup", exact: true, element: <Signup /> },
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", element: <Navigate to="/login" /> },
      { path: "/add/assignments", exact: true, element: <AssignmentForm /> },

      { path: "/assignment/list", exact: true, element: <AssignmentList /> },

    ],
  },
];

export default ThemeRoutes;

