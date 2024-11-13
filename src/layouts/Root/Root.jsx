import { Outlet } from 'react-router-dom';
import TopNavbar from '../../components/Navbar/TopNavbar/TopNavbar';
import LeftNavbar from '../../components/Navbar/LeftNavbar/LeftNavbar';
import RightNavbar from '../../components/Navbar/RightNavbar/RightNavbar';
import BottomNavbar from '../../components/Navbar/BottomNavbar/BottomNavbar';
import Footer from '../../components/Footer/Footer';

const Root = () => {
    return (
        <section className='max-w-screen-3xl mx-auto '>
            <TopNavbar></TopNavbar>

            <section className="md:grid md:gap-5 md:grid-cols-6 lg:grid-cols-12">

                <nav className="hidden md:block col-start-1 lg:col-span-2"><LeftNavbar></LeftNavbar></nav>

                {/* main container */}
                <main className="text-center min-h-screen md:col-start-2 md:col-span-5 lg:col-start-3 lg:col-span-8">
                    <Outlet></Outlet>
                    <Footer></Footer>
                </main>

                <nav className="hidden lg:block lg:col-span-2"><RightNavbar></RightNavbar></nav>

            </section>
            <BottomNavbar></BottomNavbar>

            {/* <Footer></Footer> */}
        </section>
    );
};

export default Root;