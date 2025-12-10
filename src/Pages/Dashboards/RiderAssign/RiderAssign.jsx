import React from "react";
import useAxiosSqeure from "../../../Hooks/useAxiosSqeure";
import { useQuery } from "@tanstack/react-query";

const RiderAssign = () => {
  const axiosSequere = useAxiosSqeure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parsels", "allParcels"],
    queryFn: () => axiosSequere("/parcels"),
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary">
        Totale parcels {parcels.data.length}
      </h2>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Sender Info</th>
              <th>Parcel Info</th>
              <th>Payment Status</th>
              <th>Dalivary Status</th>
              <th>To</th>
              <th>Form</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.data.map((parcel, index) => {
              return (
                <tr className="bg-base-200">
                  <th>{index + 1}</th>
                  <td>
                    <p>{parcel?.senderName}</p>
                    <p>{parcel?.senderEmail}</p>
                  </td>
                  <td>
                    <p>Name: {parcel?.parcelName}</p>
                    <p>Amount: ${parcel?.cost}</p>
                  </td>
                  <td>{parcel?.status}</td>
                  <td>{parcel?.dalivaryStatus}</td>
                  <td>{parcel?.senderDistrict}</td>
                  <td>{parcel?.receiverDistrict}</td>

                  <td><button className="btn btn-primary btn-sm text-secondary">Assign Rider</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RiderAssign;
