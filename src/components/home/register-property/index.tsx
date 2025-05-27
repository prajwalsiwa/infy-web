import { Link } from "react-router-dom";

const RegisterProperty = () => {
  return (
    <section className="section md:px-24 sm:px-10 px-6 w-full ">
      <div className="property-banner">
        <div className="relative z-10">
          <h1 className="text-white max-w-lg">
            Regsiter your property for free today
          </h1>

          <Link
            to={"/list-your-property"}
            className="inline-block mt-8 bg-white text-primary h-9 px-4 py-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors hover:brightness-95"
          >
            List your property
          </Link>
        </div>
      </div>
    </section>
  );
};

export default RegisterProperty;
