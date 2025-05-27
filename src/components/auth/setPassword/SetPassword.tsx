import { SetStateAction, useState } from "react";
import Input from "@/components/ui/FormUI/Input";
import Label from "@/components/ui/FormUI/Label";
import Icon from "@/components/ui/Icon";
import { Button } from "@/components/ui/button";

function SetPassword() {
  const [isPasswordVisible, setPasswordVisible] = useState(false);
  const [isRetypePasswordVisible, setRetypePasswordVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [retypePassword, setRetypePassword] = useState("");
  const [passwordMatchError, setPasswordMatchError] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible((prev) => !prev);
  };

  const toggleRetypePasswordVisibility = () => {
    setRetypePasswordVisible((prev) => !prev);
  };

  const handlePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setPassword(e.target.value);
    if (retypePassword && e.target.value !== retypePassword) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  const handleRetypePasswordChange = (e: { target: { value: SetStateAction<string>; }; }) => {
    setRetypePassword(e.target.value);
    if (password && e.target.value !== password) {
      setPasswordMatchError(true);
    } else {
      setPasswordMatchError(false);
    }
  };

  return (
    <div className="flex flex-col gap-5 w-full px-20">
      <span className="text-[2rem]">Set Password</span>
      {/* Password Field */}
      <div>
        <Label htmlFor="password" className="">
          Password <span className="text-red-500">*</span>
        </Label>
        <div className="relative w-full">
          <Input
            className="border rounded w-full bg-white pr-10 hover:!border-primary"
            type={isPasswordVisible ? "text" : "password"}
            id="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
          <Icon
            className="absolute right-3 !font-light top-1/2 transform -translate-y-1/2 text-gray cursor-pointer text-gray-500"
            name={isPasswordVisible ? "visibility" : "visibility_off"}
            onClick={togglePasswordVisibility}
          />
        </div>
      </div>

      {/* Retype Password Field */}
      <div>
        <Label htmlFor="retypePassword" className="">
          Retype Password <span className="text-red-500">*</span>
        </Label>
        <div className="relative w-full">
          <Input
            className="border rounded w-full bg-white pr-10 hover:!border-primary"
            type={isRetypePasswordVisible ? "text" : "password"}
            id="retypePassword"
            placeholder="Retype Password"
            value={retypePassword}
            onChange={handleRetypePasswordChange}
          />
          <Icon
            className="absolute right-3 !font-light top-1/2 transform -translate-y-1/2 text-gray cursor-pointer text-gray-500"
            name={isRetypePasswordVisible ? "visibility" : "visibility_off"}
            onClick={toggleRetypePasswordVisibility}
          />
          {passwordMatchError && (
            <p className="text-red-500 text-sm mt-2">Passwords do not match</p>
          )}
        </div>
      </div>
      <Button className="rounded p-7 hover:bg-sky-600">Set Password</Button>
    </div>
  );
}

export default SetPassword;
