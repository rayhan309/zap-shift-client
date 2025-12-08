import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSqeure from "../../../Hooks/useAxiosSqeure";
import { BanknoteArrowUp, FilePenLine, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import Swal from "sweetalert2";
import { Link } from "react-router";
// import { useState } from 'react';

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSequere = useAxiosSqeure();

  const {
    data: myParcels = [],
    isPending,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => await axiosSequere(`/parcels?email=${user?.email}`),
  });

  if (isPending) {
    return <p>Loading.....mumma</p>;
  }

  if (isError) {
    return <span>error: {error.message}</span>;
  }

  // handleDelete
  const handleDelete = (id) => {

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSequere
          .delete(`/parcels/${id}`)
          .then((res) => {
            if (res?.data?.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your parcel has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            toast.error("Delete error!", err.message);
          });
      }
    });
  };

  // handlePay
  const handlePay = async (parcel) => {
    console.log(parcel)

    const parcelInfo = {
      senderEmail: parcel.senderEmail,
      parcelId: parcel._id,
      parcelName: parcel.parcelName,
      cost: parcel.cost,
    }

    const res = await axiosSequere.post(`/create-checkout-session-2`, parcelInfo);
    window.location.href = res.data.url;
    console.log(res.data);
  };

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Sender Name</th>
            <th>Parcel Name</th>
            <th>Weight</th>
            <th>Ammount</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {myParcels.data.map((parcel, index) => {
            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{parcel?.senderName}</td>
                <td>{parcel?.parcelName}</td>
                <td>{parcel?.parcelWeight}</td>
                <td>{parcel?.cost}</td>
                <td>{parcel?.status}</td>
                <td>
                  <button
                    onClick={() => handleDelete(parcel?._id)}
                    className="btn btn-sm text-secondary"
                  >
                    <Trash2 />
                  </button>
                  <button className="btn btn-sm text-secondary mx-2">
                    <FilePenLine />
                  </button>
                  {/* to={`/dashbords/pyParcelAmmount/${parcel._id}`} */}
                  <Link onClick={() => handlePay(parcel)}  className="btn btn-sm text-secondary">
                    <BanknoteArrowUp />
                  </Link>
                </td>
              </tr>
            );
          })}
          {/* row 1 */}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default MyParcels;
