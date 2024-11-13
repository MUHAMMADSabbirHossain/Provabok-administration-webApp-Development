import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root/Root';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Landing from '../pages/Landing/Landing';
import Jobs from '../pages/Jobs/Jobs';
import CreateItem from '../pages/Jobs/CreateItem/CreateItem';
import UpdateItem from '../pages/Jobs/UpdateItem/UpdateItem';

const routers = createBrowserRouter([
    {
        path: `/`,
        element: <Root></Root>,
        children: [
            /* public routes */
            {
                path: `/`,
                element: <Landing></Landing>
            },
            {
                path: `about`,
                element: <About></About>
            },
            {
                path: `contact`,
                element: <Contact></Contact>
            },
            /* if logged go to home page. */
            {
                path: `home`,
                element: <Home></Home>
            },
            {
                path: `jobs`,
                element: <Jobs></Jobs>,
                children: [
                    {
                        path: `create-item`,
                        element: <CreateItem></CreateItem>
                    },
                    {
                        path: `update-item`,
                        element: <UpdateItem></UpdateItem>
                    },
                ],
            },
        ],
    },
]);

export default routers;