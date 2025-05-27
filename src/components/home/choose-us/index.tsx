import ChooseUsCard from "./ChooseUsCard";

const ChooseUs = () => {
  return (
    <section className="section md:px-24 sm:px-10 px-6  w-full">
      <div className="w-full">
        <h1 className="section-title text-center">Why Choose Us</h1>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          <ChooseUsCard
            title="More Deals for you"
            info="We save you money by providing deals and offers you cannot resist"
            imgSrc="/gift.svg"
          />
          <ChooseUsCard
            title="Effortless Booking"
            info="We save you time for thousands of searches."
            imgSrc="/relax.svg"
          />
          <ChooseUsCard
            title="Trusted by travelers"
            info="Join over all travelers who find hotels with us"
            imgSrc="/travel.svg"
          />
        </div>
      </div>
    </section>
  );
};

export default ChooseUs;
