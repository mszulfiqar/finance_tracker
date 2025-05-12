import { createBrowserRouter } from "react-router";
import DashboardLayout from "../DashboardLayout";
import Overview from "../pages/Overview";
import Transactions from "../pages/Transactions";

export const router = createBrowserRouter([
    {
        path:"/",
        element:<DashboardLayout />,
        children:[
            {
                path:"/",
                element:<Overview />
            },
            {
                path:"transactions",
                element:<Transactions />
            }
        ]
    }
])