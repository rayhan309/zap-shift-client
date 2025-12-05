import React from 'react';
import location from '../../../assets/athurs/location-merchant.png'
import bgimage from '../../../assets/athurs/be-a-merchant-bg.png'

const Merchant = () => {
    return (
        <div className='bg-secondary px-8 mx-10 rounded-3xl min-h-[200px] mt-10 relative'>
            <img src={bgimage} className='absolute top-0' alt="" />
            <div className='p-10 grid grid-cols-2 gap-2'>
                <div className='space-y-6 flex flex-col justify-center'>
                    <h3 className='text-2xl font-bold text-white'>Merchant and Customer Satisfaction is Our First Priority</h3>
                    <p className='text-gray-300'>We offer the lowest delivery charge with the highest value along with 100% safety of your product. Pathao courier delivers your parcels in every corner of Bangladesh right on time.</p>
                    <div className='flex gap-3'>
                        <button className='btn btn-primary text-secondary rounded-full'>Become a Merchant</button>
                        <button className='btn btn-primary btn-outline rounded-full'>Earn with ZapShift Courier</button>
                    </div>
                </div>
                <div>
                    <img src={location} alt="" />
                </div>
            </div>
        </div>
    );
};

export default Merchant;