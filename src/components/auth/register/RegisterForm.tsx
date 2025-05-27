/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useGoogleLogin } from "@react-oauth/google";
import infytripLogo from "@/assets/Images/infytripLogo.png";
import googleLogo from "@/assets/Images/google_logo.png";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/FormUI/Input";
import Label from "@/components/ui/FormUI/Label";
import Icon from "@/components/ui/Icon";
import { useForm } from "react-hook-form";
import { useRegisterMutation } from "@/redux/services/authApi";
import { useToast } from "@/hooks/use-toast";

interface RegisterFormProps {
  isLogo?: boolean;
}

interface RegisterFormData {
  password: string;
  full_name: string;
  email: string;
  confirm_password: string;
}

function RegisterForm({ isLogo = true }: RegisterFormProps) {
  const { register, handleSubmit } = useForm<RegisterFormData>();
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isReTypePasswordVisible, setReTypePasswordVisible] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();
  console.log();

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

  const [registerAuth, { isLoading }] = useRegisterMutation();
  const handleCreateAccount = async (data: {
    password: any;
    full_name: any;
    email: any;
    confirm_password: any;
  }) => {
    console.log(data);

    try {
      const { password, full_name, email, confirm_password } = data;

      const response = await registerAuth({
        password,
        full_name,
        email,
        confirm_password,
        username: "",
      }).unwrap();
      toast({
        title: "Account Created",
        description:
          "Your account has been successfully created. Please log in.",
        variant: "success",
      });
      navigate("/login");

      console.log("Account created successfully:", response);
    } catch (error) {
      toast({
        title: "Registration Failed",
        description:
          "There was an issue creating your account. Please try again.",
        variant: "destructive",
      });
      console.error("Error creating account:", error);
    }
  };

  return (
    <div className="px-20 flex items-center flex-col gap-7 w-full h-full justify-center">
      <div className="gap-7 flex flex-col w-full">
        {isLogo && (
          <div className="logo cursor-pointer" onClick={() => navigate("/")}>
            <img src={infytripLogo} alt="Logo" />
          </div>
        )}
        <span className="text-[2rem]">Create new account</span>
      </div>
      <form className="form flex flex-col w-full gap-5">
        <div className="h-full w-full gap-3 flex flex-col">
          <div className="email flex flex-col gap-1">
            <Label htmlFor="name" className="!text-sm">
              Full Name
            </Label>
            <Input
              type="text"
              id="name"
              placeholder="Full Name"
              className="border rounded !bg-white hover:!border-primary"
              {...register("full_name")}
            />
          </div>
          <div className="email flex flex-col gap-1">
            <Label htmlFor="email">
              Email <span className="text-red-500">*</span>
            </Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              className="border rounded !bg-white hover:!border-primary"
              {...register("email")}
            />
          </div>
          <div className="password w-full flex flex-col gap-1">
            <Label htmlFor="password">
              Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative w-full">
              <Input
                className="border rounded w-full bg-white pr-10 hover:!border-primary"
                type={isPasswordVisible ? "text" : "password"}
                id="password"
                placeholder="Password"
                {...register("password")}
              />
              <Icon
                className="absolute right-3 !font-light top-1/2 transform -translate-y-1/2 text-gray cursor-pointer text-gray-500"
                name={isPasswordVisible ? "visibility" : "visibility_off"}
                onClick={() => setPasswordVisible((prev) => !prev)}
              />
            </div>
          </div>
          <div className="password w-full flex flex-col gap-1">
            <Label htmlFor="retype-password">
              Re-type Password <span className="text-red-500">*</span>
            </Label>
            <div className="relative w-full">
              <Input
                className="border rounded w-full bg-white pr-10 hover:!border-primary"
                type={isReTypePasswordVisible ? "text" : "password"}
                id="retype-password"
                placeholder="Re-type Password"
                {...register("confirm_password")}
              />
              <Icon
                className="absolute right-3 !font-light top-1/2 transform -translate-y-1/2 text-gray cursor-pointer text-gray-500"
                name={isReTypePasswordVisible ? "visibility" : "visibility_off"}
                onClick={() => setReTypePasswordVisible((prev) => !prev)}
              />
            </div>
          </div>
        </div>
        <Button
          onClick={handleSubmit(handleCreateAccount)}
          className="rounded p-7 hover:bg-sky-600"
          disabled={isLoading}
        >
          {isLoading ? "Creating account..." : "Create an Account"}
        </Button>
      </form>
      <div className="flex gap-2 w-full justify-start">
        <span className="text-gray">Already have an account?</span>
        <span
          className="cursor-pointer hover:text-sky-600 text-primary"
          onClick={() => navigate("/login")}
        >
          Login
        </span>
      </div>
      <div className="w-full my-5">
        <div className="relative flex items-center">
          <div className="w-full border-t !border-[#ACAEAE]"></div>
          <span className="px-4 text-gray-700 bg-[#EDF7FD] text-lg font-normal absolute left-1/2 transform -translate-x-1/2">
            or
          </span>
        </div>
      </div>
      <div className="w-full mt-5 flex flex-col gap-2">
        <Button
          onClick={() => signInWithGoogle()}
          className="bg-white w-full h-14 flex items-center justify-center border border-gray-300 rounded-md hover:!border-primary hover:!bg-gray-100 shadow-none"
        >
          <img src={googleLogo} alt="google_logo" className="w-6 h-6 mr-2" />
          <span className="text-lg text-gray-dark font-normal">
            Continue with Google
          </span>
        </Button>
      </div>
    </div>
  );
}

export default RegisterForm;
