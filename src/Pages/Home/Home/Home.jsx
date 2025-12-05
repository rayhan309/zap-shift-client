import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from './OurServices/OurServices';
import HowItWorks from './HowItWorks/HowItWorks';

const Home = () => {
    return (
        <div className='py-10'>
           <Banner />
           <HowItWorks />
           <OurServices />
        </div>
    );
};

export default Home;