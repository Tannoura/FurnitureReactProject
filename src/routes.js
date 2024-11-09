import { Navigate, useNavigate, useRoutes } from 'react-router-dom';
import { useEffect, useState } from 'react';

// layouts
import DashboardLayout from './layouts/dashboard';
import SimpleLayout from './layouts/simple';
//
import BlogPage from './pages/BlogPage';
import UserPage from './pages/UserPage';
import LoginPage from './pages/LoginPage';
import Page404 from './pages/Page404';
import ProductsPage from './pages/ProductsPage';
import DashboardAppPage from './pages/DashboardAppPage';
import AddUserForm from './pages/AddUserForm';
import EditUserForm from './pages/EditUserForm';
import AddMeubleForm from './pages/AddMeubleForm';
import ProductList from './pages/ProductList';

// ----------------------------------------------------------------------

export default function Router() {
  const [user, setUser] = useState(null);
  const navigate= useNavigate();
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));

    }else
    {
        navigate("/login")
    }
  }, []);
  const routes = useRoutes([
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        { element: <Navigate to="/login" />, index: true },
        { path: '/dashboard/app', element: <DashboardAppPage /> },
        { path: '/dashboard/user', element: <UserPage /> },
        { path: '/dashboard/user/add', element: <AddUserForm /> },
        { path: '/dashboard/products', element: <ProductList /> },
        { path: '/dashboard/product/add', element: <AddMeubleForm /> },
        { path: '/dashboard/user/edit/:id', element: <EditUserForm /> },
     
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      element: <SimpleLayout />,
      children: [
        { element: <Navigate to="/dashboard/app" />, index: true },
        { path: '404', element: <Page404 /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
