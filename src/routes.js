import React from "react";
const Dashboard = React.lazy(() => import("./views/Dashboard"));
const Messenger = React.lazy(()=> import("./views/Messenger/index"));
const Forum = React.lazy(() => import("./views/Forum/index"));
const GroupPage =  React.lazy(() => import("./views/Forum/Groups/GroupPage"));
// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/messenger", name: "Messenger", component: Messenger },
  { path: "/forum", name: "Forum", component: Forum },
  { path: "/group/:id", exact: true, name: "Group" , component: GroupPage },

];

export default routes;
