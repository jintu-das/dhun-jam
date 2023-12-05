import { createBrowserRouter } from "react-router-dom";
import RootLayout from "./pages/root-layout";
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import { RequireAuth } from "react-auth-kit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Login />,
      },
      {
        path: "dashboard",
        element: (
          <RequireAuth loginPath="/">
            <Dashboard />
          </RequireAuth>
        ),
      },
    ],
  },
]);
