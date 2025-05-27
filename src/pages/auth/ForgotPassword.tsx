import forgotPassowrdbanner from "@/assets/Images/loginbanner.png";
import ForgotPasswordForm from "@/components/auth/forgotPassword/ForgotPasswordForm";

function ForgotPassword() {
  return (
    <div className="grid lg:grid-cols-2 h-screen w-screen">
      <div className="h-full overflow-hidden hidden lg:block">
        <img
          src={forgotPassowrdbanner}
          alt="Login Banner"
          className="h-full w-full object-cover"
        />
      </div>
      <ForgotPasswordForm />
    </div>
  );
}

export default ForgotPassword;
