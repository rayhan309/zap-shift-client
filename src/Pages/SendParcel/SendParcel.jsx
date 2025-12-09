import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosSqeure from "../../Hooks/useAxiosSqeure";

const SendParcel = () => {
  const { register, handleSubmit, control, reset } = useForm();
  const serviceSenters = useLoaderData();
  const { user } = useAuth();
  const axiosSqeure = useAxiosSqeure();
  const navigate = useNavigate();

  const regions = [...new Set(serviceSenters.map((c) => c.region))];

  const senderRegion = useWatch({ control, name: "senderRegion" });
  const receiverRegion = useWatch({ control, name: "receiverRegion" });

  const districtsByRegions = (region) => {
    if (!region) return [];
    return serviceSenters
      .filter((c) => c.region === region)
      .map((d) => d.district);
  };

  const handleSendParcel = (data) => {
    console.log("FORM DATA:", data);

    const isDocument = data.parcelType === "document";
    const isSameDistrict = data.senderDistrict === data.receiverDistrict;
    const parcelWeight = parseFloat(data.parcelWeight);

    let cost = 0;

    if (isDocument) {
      cost = isSameDistrict ? 60 : 80;
    } else {
      if (parcelWeight < 3) {
        cost = isSameDistrict ? 110 : 150;
      } else {
        const minCharge = isSameDistrict ? 110 : 150;
        const extraWeight = parcelWeight - 3;
        const extraCharge = isSameDistrict
          ? extraWeight * 40
          : extraWeight * 40 + 40;

        cost = minCharge + extraCharge;
      }
    }

    data.cost = cost;
    data.status = "UnPaide";

    Swal.fire({
      title: "Agree with the cost?",
      text: `You will be charge ${cost} taka!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Conferm & conteniu!",
    }).then((result) => {
      if (result.isConfirmed) {
        // post db
        axiosSqeure
          .post("/parcels", data)
          .then((res) => {
            if (res.data.insertedId) {
              navigate('/dashbords/my-parcels');
              Swal.fire({
                position: "top-end",
                icon: "success",
                title:
                  "Your parcel successfully added, Please conteuniu payment",
                showConfirmButton: false,
                timer: 2500,
              });
              reset();
              console.log(res.data);
            }
          })
          .catch(() => {
            // alert("mammamamam");
          });
      }
    });

    console.log("Parcel Cost:", cost);
  };

  return (
    <div className="w-full bg-white rounded-2xl my-10 mx-auto p-6 lg:p-14">
      <h1 className="text-3xl font-bold mb-6">Send A Parcel</h1>
      <p className="text-lg mb-6">Enter your parcel details</p>

      <form onSubmit={handleSubmit(handleSendParcel)}>
        {/* Parcel Type */}
        <div className="flex items-center gap-6 mb-6">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="document"
              defaultChecked
              {...register("parcelType")}
            />
            <span>Document</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              value="non-document"
              {...register("parcelType")}
            />
            <span>Not-Document</span>
          </label>
        </div>

        {/* Parcel Info */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div>
            <label className="block mb-1">Parcel Name</label>
            <input
              {...register("parcelName", { required: true })}
              className="w-full border p-3 rounded"
              placeholder="Parcel Name"
            />
          </div>

          <div>
            <label className="block mb-1">Parcel Weight (KG)</label>
            <input
              {...register("parcelWeight", { required: true })}
              type="number"
              className="w-full border p-3 rounded"
              placeholder="Parcel Weight (KG)"
            />
          </div>
        </div>

        {/* Sender & Receiver */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Sender */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Sender Details</h2>

            {/* sender name  */}
            <label className="block mb-1">Sender Name</label>
            <input
              {...register("senderName", { required: true })}
              defaultValue={user?.displayName}
              readOnly
              className="w-full border p-3 rounded mb-4"
              placeholder="Sender Name"
            />

            {/* sender email */}
            <label className="block mb-1">Sender Email</label>
            <input
              type="email"
              {...register("senderEmail", { required: true })}
              defaultValue={user?.email}
              readOnly
              className="w-full border p-3 rounded mb-4"
              placeholder="Sender Email"
            />

            {/* sender address */}
            <label className="block mb-1">Sender Address</label>
            <input
              {...register("senderAddress", { required: true })}
              className="w-full border p-3 rounded mb-4"
              placeholder="Address"
            />

            {/* sender phone */}
            <label className="block mb-1">Sender Phone</label>
            <input
              {...register("senderPhone", { required: true })}
              className="w-full border p-3 rounded mb-4"
              placeholder="Phone No"
            />

            {/* sender region */}
            <label className="block mb-1">Sender Region</label>
            <select
              {...register("senderRegion", { required: true })}
              className="w-full border p-3 rounded mb-4"
            >
              <option value="">Pick a region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>

            {/* sender district */}
            <label className="block mb-1">Sender District</label>
            <select
              {...register("senderDistrict", { required: true })}
              className="w-full border p-3 rounded mb-4"
            >
              <option value="">Pick a district</option>
              {districtsByRegions(senderRegion).map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <label className="block mb-1">Pickup Instruction</label>
            <textarea
              {...register("pickupInstruction")}
              className="w-full border p-3 rounded h-24"
              placeholder="Pickup Instruction"
            />
          </div>

          {/* Receiver */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Receiver Details</h2>

            {/* receiver name */}
            <label className="block mb-1">Receiver Name</label>
            <input
              {...register("receiverName", { required: true })}
              className="w-full border p-3 rounded mb-4"
              placeholder="Receiver Name"
            />

            {/* receiver email */}
            <label className="block mb-1">Receiver Email</label>
            <input
              {...register("receiverEmail", { required: true })}
              type="email"
              className="w-full border p-3 rounded mb-4"
              placeholder="Receiver Email"
            />

            <label className="block mb-1">Receiver Address</label>
            <input
              {...register("receiverAddress", { required: true })}
              className="w-full border p-3 rounded mb-4"
              placeholder="Receiver Address"
            />

            <label className="block mb-1">Receiver Phone</label>
            <input
              {...register("receiverPhone", { required: true })}
              className="w-full border p-3 rounded mb-4"
              placeholder="Contact No"
            />

            <label className="block mb-1">Receiver Region</label>
            <select
              {...register("receiverRegion", { required: true })}
              className="w-full border p-3 rounded mb-4"
            >
              <option value="">Pick a region</option>
              {regions.map((r, i) => (
                <option key={i} value={r}>
                  {r}
                </option>
              ))}
            </select>

            <label className="block mb-1">Receiver District</label>
            <select
              {...register("receiverDistrict", { required: true })}
              className="w-full border p-3 rounded mb-4"
            >
              <option value="">Pick a district</option>
              {districtsByRegions(receiverRegion).map((d, i) => (
                <option key={i} value={d}>
                  {d}
                </option>
              ))}
            </select>

            <label className="block mb-1">Delivery Instruction</label>
            <textarea
              {...register("deliveryInstruction")}
              className="w-full border p-3 rounded h-24"
              placeholder="Delivery Instruction"
            />
          </div>
        </div>

        <p className="text-sm mt-10 mb-6 font-medium">
          PickUp Time 4pm-7pm Approx.
        </p>

        <input
          type="submit"
          value="Submit"
          className="btn btn-primary w-[250px] text-secondary border-none"
        />
      </form>
    </div>
  );
};

export default SendParcel;
