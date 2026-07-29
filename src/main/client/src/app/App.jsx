import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HomeController } from "../controllers/HomeController";

const router = createBrowserRouter([
    {
        path: "/",
        element: <HomeController />,
    },
]);

export function App() {
    return <RouterProvider router={router} />;
}
