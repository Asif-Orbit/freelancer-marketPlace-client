import { createBrowserRouter } from "react-router";
import HomeLayout from "../homeLayout/HomeLayout";
import Home from "../components/home/Home";
import AddJob from "../components/addJob/AddJob";
import MyAddedJob from "../components/myAddedJob/MyAddedJob";
import AllJobs from "../components/allJob/AllJobs";
import MyAcceptedTasks from "../components/myAcceptedTasks.jsx/MyAcceptedTasks";
import Login from "../pages/login/Login";
import Register from "../pages/register/Register";
import NotFound from "../pages/error/NotFound";
import PrivateRoute from "../privateRoute/PrivateRoute";
import JobDetails from "../components/jobDetails/JobDetails";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomeLayout></HomeLayout>,
        children:[
            {
                index: true,
                element:<Home></Home>
            },
            {
                path:"/addJob",
                element:<PrivateRoute><AddJob></AddJob></PrivateRoute>
            },
            {
                path:"/allJobs",
                element:<AllJobs></AllJobs>
            },
            {
                path:"allJobs/:id",
                element:<PrivateRoute><JobDetails></JobDetails></PrivateRoute>
            },
            {
                path:"/myAddedJobs",
                element:<PrivateRoute><MyAddedJob></MyAddedJob></PrivateRoute>
            },
            {
                path:"/my-accepted-tasks",
                element:<PrivateRoute><MyAcceptedTasks></MyAcceptedTasks></PrivateRoute>
            },
            {
                path: "/login",
                element: <Login></Login>
            },
            {
                path: "/register",
                element: <Register></Register>
            },
            {
                path:"*",
                element:<NotFound></NotFound>

            }
        ]
    }
])