import React from 'react';
import Banner from '../Banner/Banner';
import OurServices from './OurServices/OurServices';
import HowItWorks from './HowItWorks/HowItWorks';
import Brands from '../Brands/Brands';
import Features from '../Feuturs/Feuturs';
import Merchant from '../Merchant/Merchant';
import CustomerSayings from '../CustomerSayings/CustomerSayings';
import Question from '../Qestions/Qestions';

const rewiesPromiss = fetch('/rewies.json').then(res => res.json());

const Home = () => {
    return (
        <div className='py-10'>
           <Banner />
           <HowItWorks />
           <OurServices />
           <Brands />
           <Features />
           <Merchant />
           <CustomerSayings rewiesPromiss={rewiesPromiss} />
           <Question />
        </div>
    );
};

export default Home;