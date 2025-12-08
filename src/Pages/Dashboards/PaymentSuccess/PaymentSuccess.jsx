import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSqeure from '../../../Hooks/useAxiosSqeure';
import { toast, ToastContainer } from 'react-toastify';

const PaymentSuccess = () => {
     const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSqeure = useAxiosSqeure();

    useEffect(() => {
        axiosSqeure.patch(`payment-success?session_id=${sessionId}`).then(res => {
            console.log(res.data)
        }).catch(err => {
            toast.error(err?.message);
        })
    }, [axiosSqeure, sessionId]);
    // console.log('session id', sessionId)
    return (
        <div>
            ima paynebt successfull!
            <ToastContainer />
        </div>
    );
};

export default PaymentSuccess;