import LoginForm from "@/components/auth/login/LoginForm";
import loginbanner from "@/assets/Images/loginbanner.png";

function Login() {
  return (
    <div className="grid lg:grid-cols-2 h-screen w-screen">
      <div className="h-full overflow-hidden hidden lg:block">
        <img
          src={loginbanner}
          alt="Login Banner"
          className="h-full w-full object-cover"
        />
      </div>
      <LoginForm />
    </div>
  );
}

export default Login;
