import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router';
import useAxiosSqeure from '../../../Hooks/useAxiosSqeure';
import { toast, ToastContainer } from 'react-toastify';
import { useState } from 'react';

const PaymentSuccess = () => {
     const [searchParams] = useSearchParams();
    const sessionId = searchParams.get('session_id');
    const axiosSqeure = useAxiosSqeure();
    const [trackingId, setTrackingId] = useState("");
    const [transactionId, setTransactionId] = useState("");

    useEffect(() => {
        axiosSqeure.patch(`payment-success?session_id=${sessionId}`).then(res => {
            console.log(res.data);
            setTrackingId(res.data.trackingId);
            setTransactionId(res.data.transactionId)
        }).catch(err => {
            toast.error(err?.message);
        })
    }, [axiosSqeure, sessionId]);
    // console.log('session id', sessionId)
    return (
        <div>
            ima paynebt successfull!
            <p>trackingId: {trackingId}</p>
            <p>transactionId: {transactionId}</p>
            <ToastContainer />
        </div>
    );
};

export default PaymentSuccess;