import { createBrowserRouter, RouteObject } from "react-router-dom";
import DefaultLayout from "src/layouts/default/default.layout.tsx";
import HomePage from "src/pages/home/home.page.tsx";
import LoginPage from "src/pages/login/login.page.tsx";
import ProfilePage from "src/pages/profile/profile.page.tsx";
import AuthGuard from "src/components/AuthGuard.tsx";
import LogoutPage from "src/pages/logout/logout.page.tsx";

const routes: RouteObject[] = [
  {
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "signin",
        element: <LoginPage />,
      },
      {
        path: "profile",
        element: (
          <AuthGuard>
            <ProfilePage />
          </AuthGuard>
        ),
      },
      {
        path: "logout",
        element: <LogoutPage />,
      },
      {
        path: "*",
        element: <h1>Not Found</h1>,
      },
    ],
  },
];

export const router = createBrowserRouter(routes, {
  basename: import.meta.env.VITE_PATH_PREFIX || "/",
});
