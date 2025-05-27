/* eslint-disable no-console */
import { useForm } from "react-hook-form";
import {
  useLazyAuthUserProfileQuery,
  useLoginMutation,
  useRefreshAuthMutation,
} from "@/redux/services/authApi";
import infytripLogo from "@/assets/Images/infytripLogo.png";
import googleLogo from "@/assets/Images/google_logo.png";
// import facebookLogo from "@/assets/Images/logo_facebook.png";
import Label from "../../ui/FormUI/Label";
import Input from "../../ui/FormUI/Input";
import { Button } from "../../ui/button";
import { useEffect, useState } from "react";
import Icon from "../../ui/Icon";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useContinueBookingMutation } from "@/redux/services/staysApi";
import { RootState, useAppSelector } from "@/redux/store";
import { usePackageBookingMutation } from "@/redux/services/packagesApi";
import { useGoogleLogin } from "@react-oauth/google";

type LoginFormValues = {
  username: string;
  password: string;
};
interface LoginFormProps {
  isLogo?: boolean;
}

function LoginForm({ isLogo = true }: LoginFormProps) {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [login, { isLoading, error }] = useLoginMutation();
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { id } = useParams();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();

  const [continueBooking] = useContinueBookingMutation();
  const [packageBooking] = usePackageBookingMutation();

  const hotelBookingDetails = useSelector(
    (state: RootState) => state.stays?.pendingBooking
  );

  const packageContinueBookingBody = useSelector(
    (state: RootState) => state.packages.continueBookingBody
  );
  const [authUserProfile] = useLazyAuthUserProfileQuery();

  const onSubmit = async (data: LoginFormValues) => {
    const { username, password } = data;

    try {
      // Attempt login
      await login({ username, password }).unwrap();
      const token = localStorage.getItem("token");
      if (isAuthenticated && token) {
        refreshAuth({ token }).unwrap();
        authUserProfile();
      }
      // Handle navigation based on the current path
      if (pathname.includes("checkout")) {
        if (pathname.includes("hotel")) {
          await continueBooking(hotelBookingDetails);
          navigate(`../${id}/set-details`);
        } else if (pathname.includes("package")) {
          if (packageContinueBookingBody) {
            packageBooking(packageContinueBookingBody).unwrap();

            navigate(`../${id}/set-details`);
          } else {
            console.error("Package booking body is missing");
          }
        }
      } else {
        navigate("/");
      }
    } catch (err) {
      // Handle login errors
      console.error("Login failed:", err);
    }
  };

  const [refreshAuth] = useRefreshAuthMutation();

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  useEffect(() => {
    if (isAuthenticated) {
      const token = localStorage.getItem("token");
      if (token) {
        refreshAuth({ token }).unwrap();
        authUserProfile();
      }
    }
  }, [authUserProfile, isAuthenticated, refreshAuth]);

  const signInWithGoogle = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        const accessToken = tokenResponse.access_token;
        const response = await fetch(
          "https://inf.rajeshpudasaini.com.np/api/v4/auth/google",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: accessToken }), // Send token to backend
          }
        );

        const data = await response.json();
        if (data.success) {
          console.log("User authenticated successfully", data.user);
        } else {
          console.error("Authentication failed");
        }
      } catch (error) {
        console.error("Google login failed", error);
      }
    },
    onError: () => console.log("Login Failed"),
  });

  return (
    <div className="px-20 flex items-center flex-col gap-7 w-full h-full justify-center">
      {isLogo && (
        <div className="gap-7 flex flex-col w-full">
          <div className="logo cursor-pointer" onClick={() => navigate("/")}>
            <img src={infytripLogo} alt="Infytrip Logo" />
          </div>
          <span className="text-[2rem]">Login to your Account</span>
        </div>
      )}
      <form
        className="form flex flex-col w-full gap-4"
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Username Field */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="username">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            type="email"
            id="username"
            placeholder="Username"
            {...register("username", {
              required: "Email is required",
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: "Enter a valid email address",
              },
            })}
            className={`border rounded bg-white hover:!border-primary ${
              errors.username ? "border-red-500" : ""
            }`}
          />
          {errors.username && (
            <span className="text-red-500 text-sm">
              {errors.username.message}
            </span>
          )}
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1">
          <Label htmlFor="password">
            Password <span className="text-red-500">*</span>
          </Label>
          <div className="relative w-full">
            <Input
              type={isPasswordVisible ? "text" : "password"}
              id="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters long",
                },
              })}
              className={`border rounded w-full pr-10 bg-white hover:!border-primary ${
                errors.password ? "border-red-500" : ""
              }`}
            />
            <Icon
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer"
              name={isPasswordVisible ? "visibility" : "visibility_off"}
              onClick={togglePasswordVisibility}
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm">
              {errors.password.message}
            </span>
          )}
          <span
            className="text-gray text-xs w-full justify-end flex hover:text-gray-500 cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password?
          </span>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          className="rounded p-7 hover:bg-sky-600"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login"}
        </Button>

        {/* Error Handling for API Call */}
        {error && (
          <span className="text-red-500 text-sm">
            {"status" in error && error.status === 401
              ? "Invalid username or password. Please try again."
              : "An error occurred. Please try again later."}
          </span>
        )}
      </form>

      {/* Sign Up Prompt */}
      <div className="flex gap-2 w-full justify-start">
        <span className="text-gray">Don’t have an account yet?</span>
        <span
          className="cursor-pointer hover:text-sky-600 text-primary"
          onClick={() => navigate("/sign-up")}
        >
          Create new account
        </span>
      </div>

      {/* Divider */}
      <div className="w-full my-5">
        <div className="relative flex items-center">
          <div className="w-full border-t !border-[#ACAEAE]"></div>
          <span className="px-4 text-gray-700 bg-[#EDF7FD] text-lg font-normal absolute left-1/2 transform -translate-x-1/2">
            or
          </span>
        </div>
      </div>

      {/* OAuth Buttons */}
      <div className="w-full mt-5 flex flex-col gap-2">
        <Button
          onClick={() => signInWithGoogle()}
          className="bg-white w-full h-14 flex items-center justify-center border border-gray-300 rounded-md hover:!border-primary hover:!bg-gray-100 shadow-none"
        >
          <img src={googleLogo} alt="Google Logo" className="w-6 h-6 mr-2" />
          <span className="text-lg text-gray-dark font-normal">
            Continue with Google
          </span>
        </Button>
        {/* <Button
          onClick={() => {}}
          className="bg-white w-full h-14 flex items-center justify-center border border-gray-300 hover:!border-primary rounded-md hover:bg-gray-100 shadow-none"
        >
          <img
            src={facebookLogo}
            alt="Facebook Logo"
            className="w-6 h-6 mr-2"
          />
          <span className="text-lg font-normal text-gray-dark">
            Continue with Facebook
          </span>
        </Button> */}
      </div>
    </div>
  );
}

export default LoginForm;
