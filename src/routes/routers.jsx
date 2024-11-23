import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root/Root';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Landing from '../pages/Landing/Landing';
import Jobs from '../pages/Jobs/Jobs';
import CreateItem from '../pages/Jobs/Circulars/Circular/CreateItem/CreateItem';
import EditItem from '../pages/Jobs/EditItem/EditItem';

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
            },
            {
                path: `jobs/circulars/create-item`,
                element: <CreateItem></CreateItem>
            },
            {
                path: `jobs/edit-item/:id`,
                element: <EditItem></EditItem>
            },
        ],
    },
]);

export default routers;