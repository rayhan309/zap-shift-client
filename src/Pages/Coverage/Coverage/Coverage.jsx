import React from 'react';
import Map from '../Map/Map';
import { useLoaderData } from 'react-router';

const Coverage = () => {
    const servicecenter = useLoaderData();
    return (
        <div className='bg-white rounded-2xl my-5 min-h-[200px] p-12'>
            <Map servicecenter={servicecenter} />
        </div>
    );
};

export default Coverage;