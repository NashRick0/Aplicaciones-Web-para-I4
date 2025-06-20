import Dashboard from "../modules/dashboard/Dashboard";
import Userform from "../modules/user/UserForm";
import UserTable from "../modules/user/UserTable";

export interface AppRoute {
  path: string;
  element: JSX.Element;
  label?: string;
  icon?: string;
  //roles?: string[];
  //hide?: boolean;
}

const routes: AppRoute[] = [
  {
    path: "/",
    element: <Userform />,
    label: "Inicio",
    icon: "HomeOutlined",
  },
  {
    path: "/user",
    element: <Userform />,
    label: "Usuarios",
    icon: "UserOutlined",
  },
  {
    path: "/users",
    element: <UserTable />,
    label: "Lista de Usuarios",
    icon: "UserOutlined",
  },
  {
    path: "/products",
    element: <Userform />,
    label: "Productos",
    icon: "UserOutlined",
  },
  {
    path: "/orders",
    element: <Userform />,
    label: "Ordenes",
    icon: "UserOutlined",
  },
];

export default routes;
