import React from 'react';
import { Outlet } from 'react-router';
import Navber from '../Pages/Shared/Navber/Navber';
import Footer from '../Pages/Shared/Footer/Footer';

const RootLayout = () => {
    return (
        <div className='max-w-7xl mx-auto'>
            <Navber />
            <Outlet />
            <Footer />
        </div>
    );
};

export default RootLayout;