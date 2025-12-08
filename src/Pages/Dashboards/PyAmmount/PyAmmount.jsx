import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSqeure from "../../../Hooks/useAxiosSqeure";

const PyAmmount = () => {
  const { id } = useParams();
  const axiosSqeure = useAxiosSqeure();
  const [parcel, setParcel] = useState({});

  useEffect(() => {
    axiosSqeure.get(`/parcels/${id}`).then((res) => {
      console.log(res.data);
      setParcel(res.data);
    });
  }, [axiosSqeure, id]);

  // handlePayment
  const handlePayment = async () => {
     const paymentInfo = {
      cost: parcel.cost,
      parcelId: parcel._id,
      senderEmail: parcel.senderEmail,
      parcelName: parcel.parcelName,
     };
    const res = await axiosSqeure.post(`/create-checkout-session`, paymentInfo);
    console.log(res.data);
    window.location.href = res.data.url;
  }
  // console.log(id);
  return (
    <div>
      <h3>
        im a py ${parcel.cost} ammount {parcel.parcelName}
      </h3>
      <button onClick={handlePayment} className="btn btn-primary text-secondary">py</button>
    </div>
  );
};

export default PyAmmount;
