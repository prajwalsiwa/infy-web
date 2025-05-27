import { Button } from "@/components/ui/button";
import CheckboxWithLabel from "@/components/ui/FormUI/CheckboxInput";
import Input from "@/components/ui/FormUI/Input";
import Label from "@/components/ui/FormUI/Label";
import { setUserInfo, userInfoState } from "@/redux/features/staysSlice";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

interface FormData {
  name: string;
  email: string;
  country_code: string;
  mobile_number: string;
}

function SetDetailsForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const userInfo: userInfoState = {
      name: data.name,
      email: data.email,
      mobile_number: `${data.country_code}${data.mobile_number}`,
    };

    dispatch(setUserInfo(userInfo));
    navigate(`../${id}/pay-with`);
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col">
          <span className="font-medium text-xl">Your Details</span>
          <span className="text-gray">
            We will use these details to share your booking information
          </span>
        </div>
        <CheckboxWithLabel
          label="Book with my existing details"
          className="border-gray-200"
        />
      </div>

      <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex gap-4 w-full">
          <div className="w-full flex flex-col gap-1">
            <Label htmlFor="name">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Full Name"
              className="border rounded !bg-white hover:!border-primary w-full"
              {...register("name", { required: "Full Name is required" })}
            />
            {errors.name && (
              <span className="text-red-500 text-sm">
                {errors.name.message}
              </span>
            )}
          </div>

          <div className="w-full flex flex-col gap-1">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email Address"
              className="border rounded !bg-white hover:!border-primary w-full"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
            />
            {errors.email && (
              <span className="text-red-500 text-sm">
                {errors.email.message}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col w-full mt-4 pr-3">
          <Label htmlFor="number">
            Mobile Number <span className="text-red-500">*</span>
          </Label>
          <div className="gap-2 flex items-center ">
            <select
              {...register("country_code", {
                required: "Country code is required",
              })}
              className="border rounded bg-white text-gray-700 py-2 px-2"
            >
              <option value="+977">+977 (NP)</option>
              <option value="+91">+91 (IN)</option>
              <option value="+1">+1 (US)</option>
              <option value="+44">+44 (UK)</option>
              <option value="+61">+61 (AU)</option>
            </select>

            <Input
              id="number"
              type="number"
              placeholder="XXXXXXXX"
              className="border rounded !bg-white  hover:!border-primary w-1/2"
              {...register("mobile_number", {
                required: "Mobile number is required",
                pattern: {
                  value: /^[0-9]{6,12}$/,
                  message: "Enter a valid mobile number",
                },
              })}
            />
          </div>
          {errors.mobile_number && (
            <span className="text-red-500 text-sm">
              {errors.mobile_number.message}
            </span>
          )}
          {errors.country_code && (
            <span className="text-red-500 text-sm">
              {errors.country_code.message}
            </span>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            type="submit"
            className="border transition transform active:scale-9 !hover:bg-gray-100 border-black bg-white text-black font-normal py-6 px-10 w-[11.6875rem] mt-4"
          >
            Set my details
          </Button>
          <Button
            type="submit"
            className="border transition transform active:scale-9 border-gray bg-sky-500 hover:bg-sky-600 text-white font-normal py-6 px-10 w-[11.6875rem] mt-4"
          >
            Next
          </Button>
        </div>
      </form>
    </div>
  );
}

export default SetDetailsForm;
