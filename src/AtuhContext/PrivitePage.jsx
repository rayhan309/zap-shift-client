import React from 'react';
import useAuth from '../Hooks/useAuth';
import { Navigate, useLocation } from 'react-router';

const PrivitePage = ({children}) => {

    const {user, loading} = useAuth();
    const location = useLocation();
    // console.log(location)

    if(loading){
        return <p>Loading....</p>
    }

    if(user) {
        return children;
    }

    return <Navigate state={location.pathname} to={'/login'}></Navigate>
};

export default PrivitePage;