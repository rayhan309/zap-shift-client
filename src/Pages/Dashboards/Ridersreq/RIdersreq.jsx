import { useQuery } from "@tanstack/react-query";
import useAxiosSqeure from "../../../Hooks/useAxiosSqeure";
import useAuth from "../../../Hooks/useAuth";
import { CircleCheck, CircleX, Eye, Trash2 } from "lucide-react";
import { toast, ToastContainer } from "react-toastify";

const RIdersreq = () => {
  const axiosSequere = useAxiosSqeure();
  const { user } = useAuth();
  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["riders", user?.email],
    queryFn: async () => {
      const res = axiosSequere("/riders");
      return res;
    },
  });

  if (isLoading) {
    return <p>Loading.....</p>;
  }

  const handleUpdate = obj => {
      axiosSequere.patch(`/riders/${obj.id}`, obj).then(res=> {
      if(res.data) {
        refetch();
      }
    }).catch(err => {
      console.log(err)
    });
  }

  if (isError) {
    return "data feacthign error";
  }

  // handleSilected
  const handleSilected = rider => {
    const select = {
      status: 'selected',
      email: rider.email,
      id: rider._id
    } 
    handleUpdate(select)
  
  }

  // handleRiject
  const handleRiject = rider => {
     const select = {
      status: 'not selected',
      email: rider.email,
      id: rider._id
    }

    handleUpdate(select)

  }

  // handleDelete
  const handleDelete = (id) => {
    // console.log(id)
     axiosSequere.delete(`/riders/${id}`).then(res=> {
      if(res.data) {
        refetch();
      }
    }).catch(err => {
      console.log(err)
    });
  } 


  // handleShowModal
  const handleShowModal = rider => {
    toast.success('Show modale & user data', rider.name);
  }

  // console.log(data);

  return (
    <div className="overflow-x-auto">
      <table className="table table-zebra">
        {/* head */}
        <thead>
          <tr>
            <th></th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {/* row */}
          {data?.data.map((d, index) => {
            return (
              <tr key={d._id}>
                <th>{index + 1}</th>
                <td>{d?.name}</td>
                <td>{d?.email}</td>
                <td>{d?.phone}</td>
                <td>{d?.status}</td>
                <td>
                    <Eye onClick={() => handleShowModal(d)} className="btn btn-primary border-none text-secondary mr-5" width={17} />
                    <CircleCheck onClick={() => handleSilected(d)} className="btn btn-primary border-none text-secondary" width={17} />
                    <CircleX onClick={() => handleRiject(d)} className="btn btn-error text-red-800 border-none ml-5" width={17} />
                    <Trash2 onClick={() => handleDelete(d._id)} className="btn btn-error text-red-800 border-none ml-5" width={17} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default RIdersreq;
