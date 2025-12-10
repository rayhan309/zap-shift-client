import { useQuery } from "@tanstack/react-query";
import React from "react";
import useAxiosSqeure from "../../../Hooks/useAxiosSqeure";
import { UserMinus, UserPlus } from "lucide-react";
import Swal from "sweetalert2";
// import useAuth from "../../../Hooks/useAuth";
// import useUserRole from "../../../Hooks/useUaerRole";
// import useUaerRole from "../../../Hooks/useUaerRole";

const UsersManagement = () => {
  const axiosSqeure = useAxiosSqeure();
  // const {role} = useUserRole();
  // console.log(role)
  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["users", "users"],
    queryFn: async () => {
      const res = await axiosSqeure("/users");
      return res.data;
    },
  });

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>internale server erroe 404</p>;
  }

  // handleAddAdmin
  const handleAddAdmin = (user) => {
    const roleInfo = { role: "admin" };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this parsone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Add!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSqeure
          .patch(`/users/${user?._id}`, roleInfo)
          .then((res) => {
            if (res.data.modifiedCount) {
              refetch();
              Swal.fire({
                title: "Admin has add!",
                text: "Your parsone has been add a admin.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              // footer: '<a href="#">Why do I have this issue?</a>',
            });
          });
      }
    });

    // console.log(user._id, roleInfo);
  };

  // handleMinusAdmin
  const handleMinusAdmin = (user) => {
    const roleInfo = { role: "user" };

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this parsone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSqeure
          .patch(`/users/${user?._id}`, roleInfo)
          .then((res) => {
            if (res.data.modifiedCount) {
              // con
              refetch();
              Swal.fire({
                title: "Admin has add!",
                text: "Your parsone has been add a user.",
                icon: "success",
              });
            }
          })
          .catch((err) => {
            console.log(err)
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Something went wrong!",
              // footer: '<a href="#">Why do I have this issue?</a>',
            });
          });
      }
    });

    // console.log(user._id, roleInfo);
  };

  return (
    <div>
      <p>users {users.length}</p>

      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          {users.map((user, i) => {
            return (
              <tbody key={i}>
                {/* row 1 */}
                <tr>
                  <th>{i + 1}</th>
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img
                            src={user?.photoURL}
                            alt="Avatar Tailwind CSS Component"
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">{user?.name}</div>
                        <div className="text-sm opacity-50">United States</div>
                      </div>
                    </div>
                  </td>
                  <td>{user.email}</td>
                  <td>{user?.role}</td>
                  <th>
                    {user?.role === "admin" ? (
                      <UserMinus
                      onClick={() => handleMinusAdmin(user)}
                        className="btn btn-warning text-red-500 btn-xs"
                        width={17}
                      />
                    ) : (
                      <UserPlus
                        onClick={() => handleAddAdmin(user)}
                        className="btn btn-primary text-secondary btn-xs"
                        width={17}
                      />
                    )}
                  </th>
                </tr>
              </tbody>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default UsersManagement;
