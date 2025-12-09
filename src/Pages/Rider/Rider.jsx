import { useForm, useWatch } from "react-hook-form";
import riderImg from "../../assets/athurs/agent-pending.png";
import useAuth from "../../Hooks/useAuth";
import useAxiosSqeure from "../../Hooks/useAxiosSqeure";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";

const Rider = () => {
  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();
  const navigate = useNavigate();
  const axiosSqeure = useAxiosSqeure();
  const serviceSenters = useLoaderData();
  const fackRegions = serviceSenters.map(
    (serviceSenter) => serviceSenter.region
  );

  const regions = [...new Set(fackRegions)];
  const region = useWatch({ control, name: "region" });
  // console.log(districts);

  // chuce district
  const districtByRegions = (region) => {
    if (!region) {
      return [];
    }

    const districks = serviceSenters
      .filter((s) => s.region === region)
      .map((d) => d.district);

    return districks;
  };

  const onSubmit = (data) => {
    // console.log(data);

    const riderInfo = {
      name: data?.name,
      email: data?.email,
      license: data?.license,
      region: data?.region,
      district: data?.district,
      nid: data?.nid,
      phone: data?.phone,
      bikeModel: data?.bikeModel,
      bikeReg: data?.bikeReg,
    };

    // console.log(riderInfo);
    axiosSqeure
      .post(`/riders?email=${user.email}`, riderInfo)
      .then((res) => {
        if (res.data.insertedId) {
          Swal.fire({
            title: "Your request send, Please wait, we will let you know within 45 days.!",
            icon: "success",
            draggable: true,
          });
          reset();
          navigate('/')
        }
        if (res.data.message === "your req alrady send") {
          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Your request alrady send!",
            // footer: '<a href="#">Why do I have this issue?</a>',
          });
          navigate('/')
          reset();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const inputStyle =
    "w-full border border-blue-100 rounded-md px-4 py-2 focus:outline-blue-200 duration-150";
  const errorStyle = "border-red-500";

  return (
    <div className="p-16 bg-white rounded-2xl my-8">
      {/* Header */}
      <h1 className="text-4xl font-bold text-secondary">Be a Rider</h1>
      <p className="text-gray-600 mt-2">
        Enjoy fast, reliable parcel delivery with real-time tracking and zero
        hassle. From personal packages to business shipments — we deliver on
        time, every time.
      </p>

      {/* Section Title */}
      <h2 className="text-2xl font-semibold text-secondary mt-10">
        Tell us about yourself
      </h2>

      <div className="flex flex-wrap items-start gap-24">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-6 space-y-6 flex-1"
        >
          {/* Name */}
          <div>
            <label className="block font-medium mb-1">Your Name</label>
            <input
              type="text"
              placeholder="Your Name"
              {...register("name")}
              defaultValue={user?.displayName}
              readOnly
              className={`${inputStyle}`}
            />
          </div>

          {/* Driving License */}
          <div>
            <label className="block font-medium mb-1">
              Driving License Number
            </label>
            <input
              type="text"
              placeholder="Driving License Number"
              {...register("license", {
                required: "Driving license number is required",
              })}
              className={`${inputStyle} ${errors.license && errorStyle}`}
            />
            {errors.license && (
              <p className="text-red-500 text-sm mt-1">
                {errors.license.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block font-medium mb-1">Your Email</label>
            <input
              type="email"
              placeholder="Your Email"
              {...register("email")}
              className={`${inputStyle}`}
              defaultValue={user?.email}
              readOnly
            />
          </div>

          {/* Region */}
          <div>
            <label className="block font-medium mb-1">Your Region</label>
            <select
              {...register("region", { required: "Region is required" })}
              className={`${inputStyle} ${errors.region && errorStyle}`}
            >
              <option value="">Select your Region</option>
              {regions.map((region, index) => {
                return (
                  <option key={index} value={region}>
                    {region}
                  </option>
                );
              })}
            </select>
            {errors.region && (
              <p className="text-red-500 text-sm mt-1">
                {errors.region.message}
              </p>
            )}
          </div>

          {/* District */}
          <div>
            <label className="block font-medium mb-1">Your District</label>
            <select
              {...register("district", { required: "District is required" })}
              className={`${inputStyle} ${errors.district && errorStyle}`}
            >
              <option value="">Select your District</option>
              {districtByRegions(region).map((d, i) => {
                return (
                  <option key={i} value={d}>
                    {d}
                  </option>
                );
              })}
            </select>
            {errors.district && (
              <p className="text-red-500 text-sm mt-1">
                {errors.district.message}
              </p>
            )}
          </div>

          {/* NID */}
          <div>
            <label className="block font-medium mb-1">NID No</label>
            <input
              type="text"
              placeholder="NID"
              {...register("nid", { required: "NID is required" })}
              className={`${inputStyle} ${errors.nid && errorStyle}`}
            />
            {errors.nid && (
              <p className="text-red-500 text-sm mt-1">{errors.nid.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input
              type="text"
              placeholder="Phone Number"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^[0-9]{11}$/,
                  message: "Phone number must be 11 digits",
                },
              })}
              className={`${inputStyle} ${errors.phone && errorStyle}`}
            />
            {errors.phone && (
              <p className="text-red-500 text-sm mt-1">
                {errors.phone.message}
              </p>
            )}
          </div>

          {/* Bike Model */}
          <div>
            <label className="block font-medium mb-1">
              Bike Brand Model and Year
            </label>
            <input
              type="text"
              placeholder="Bike Brand Model and Year"
              {...register("bikeModel", { required: "Bike model is required" })}
              className={`${inputStyle} ${errors.bikeModel && errorStyle}`}
            />
            {errors.bikeModel && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bikeModel.message}
              </p>
            )}
          </div>

          {/* Bike Reg */}
          <div>
            <label className="block font-medium mb-1">
              Bike Registration Number
            </label>
            <input
              type="text"
              placeholder="Bike Registration Number"
              {...register("bikeReg", {
                required: "Bike registration number is required",
              })}
              className={`${inputStyle} ${errors.bikeReg && errorStyle}`}
            />
            {errors.bikeReg && (
              <p className="text-red-500 text-sm mt-1">
                {errors.bikeReg.message}
              </p>
            )}
          </div>

          {/* About */}
          <div>
            <label className="block font-medium mb-1">
              Tell Us About Yourself
            </label>
            <textarea
              placeholder="Tell Us About Yourself"
              {...register("about", { required: "This field is required" })}
              className={`${inputStyle} ${errors.about && errorStyle}`}
              rows={3}
            />
            {errors.about && (
              <p className="text-red-500 text-sm mt-1">
                {errors.about.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-lime-300 hover:bg-lime-400 cursor-pointer text-secondary font-semibold py-2 rounded-md"
          >
            Submit
          </button>
        </form>

        <div className="flex-1">
          <img src={riderImg} alt="bikerRider" />
        </div>
      </div>
    </div>
  );
};

export default Rider;
