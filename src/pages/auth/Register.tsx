import registerbanner from "@/assets/Images/loginbanner.png";
import RegisterForm from "@/components/auth/register/RegisterForm";

function Register() {
  return (
    <div className="grid lg:grid-cols-2 h-screen w-screen overflow-x-hidden">
      <div className="h-full overflow-hidden hidden lg:block">
        <img
          src={registerbanner}
          alt="Login Banner"
          className="h-full w-full object-cover"
        />
      </div>
      <RegisterForm />
    </div>
  );
}

export default Register;
