import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from './OurServices/OurServices';
import HowItWorks from './HowItWorks/HowItWorks';
import Brands from '../Brands/Brands';
import Features from '../Feuturs/Feuturs';
import Merchant from '../Merchant/Merchant';

const Home = () => {
    return (
        <div className='py-10'>
           <Banner />
           <HowItWorks />
           <OurServices />
           <Brands />
           <Features />
           <Merchant />
        </div>
    );
};

export default Home;