import { createBrowserRouter } from "react-router";
import HomeLayout from "../homeLayout/HomeLayout";
import Home from "../components/home/Home";
import AddJob from "../components/addJob/AddJob";
import MyAddedJob from "../components/myAddedJob/MyAddedJob";
import AllJobs from "../components/allJob/AllJobs";
import MyAcceptedTasks from "../components/myAcceptedTasks.jsx/MyAcceptedTasks";


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
                element:<AddJob></AddJob>
            },
            {
                path:"/allJobs",
                element:<AllJobs></AllJobs>
            },
            {
                path:"/myAddedJobs",
                element:<MyAddedJob></MyAddedJob>
            },
            {
                path:"/my-accepted-tasks",
                element:<MyAcceptedTasks></MyAcceptedTasks>
            }
        ]
    }
])