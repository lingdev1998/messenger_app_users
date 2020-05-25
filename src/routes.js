import React from "react";
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Messenger = React.lazy(()=> import("./views/Messenger/index"));
 

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/messenger", name: "Messenger", component: Messenger },


];

export default routes;
