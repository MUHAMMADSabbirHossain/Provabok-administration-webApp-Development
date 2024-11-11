import { createBrowserRouter } from 'react-router-dom';
import Root from '../layouts/Root/Root';
import Home from '../pages/Home/Home';
import About from '../pages/About/About';
import Contact from '../pages/Contact/Contact';
import Landing from '../pages/Landing/Landing';

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
            /* if logged go to home page. */
            {
                path: `home`,
                element: <Home></Home>
            },
            {
                path: `about`,
                element: <About></About>
            },
            {
                path: `contact`,
                element: <Contact></Contact>
            },
        ]
    }
]);

export default routers;