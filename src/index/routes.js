import Blank_1 from "../views/blank_1/Blank_1.js";
import Blank_2 from "../views/blank_2/Blank_2.js";
import Plaza from "../views/plaza/Plaza.js";
import Prose from "../views/prose/Prose.js";
import User from "../views/user/User.js";

const routes = [
  {
    path: "/index/blank_1",
    component: Blank_1,
  },
  {
    path: "/index/blank_2",
    component: Blank_2,
  },
  {
    path: "/index/plaza",
    component: Plaza,
  },
  {
    path: "/index/prose",
    component: Prose,
  },
  {
    path: "/index/user",
    component: User,
  },
];
export default routes
