import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSqeure from "../../../Hooks/useAxiosSqeure";

const PaymentHistorys = () => {
  const { user } = useAuth();
  const axiosSqeure = useAxiosSqeure();
  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user.email],
    queryFn: async () => await axiosSqeure(`/payments?email=${user?.email}`),
  });

  if (isLoading) {
    return <p>Loading....</p>;
  }

//   console.log(payments.data);

  return (
    <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
      <table className="table">
        {/* head */}
        <thead>
          <tr>
            <th>No</th>
            <th>ParcelInfo</th>
            <th>Recipient Info</th>
            <th>Tracking Number</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {payments.data.map((payment, index) => {
            return <tr key={payment._id}>
              <th>{index + 1}</th>
              <td>{payment.parcelName}</td>
              <td>{payment.transactionId}</td>
              <td>{payment.trackingId}</td>
              <td>{payment.customerEmail}</td>
              <td><button className="btn btn-sm border-none bg-gray-200">View</button></td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistorys;
