import { Button } from "@/components/ui/button";
import Icon from "@/components/ui/Icon";

const TestimonialSection = () => {
  return (
    <div className="lg:px-24 sm:px-10 px-6">
      <h2 className="text-primary-dark text-[2.25rem] leading-[2.25rem] font-medium text-center">
        Hotel owners on InfyTrip
      </h2>
      <div className="rounded-3xl border flex lg:flex-row flex-col overflow-hidden mt-8 ">
        <div className="h-[23.975rem] border lg:w-[50%]">
          <img
            src="https://static.vecteezy.com/system/resources/thumbnails/038/974/578/small_2x/ai-generated-professional-portrait-of-a-competent-woman-free-photo.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative flex justify-start items-start md:justify-center flex-col lg:px-20 lg:w-[50%] bg-sky-50 gap-6 p-4">
          <div className="flex flex-col gap-4 items-start">
            <span className="font-medium text-2xl">“An amazing service”</span>
            <span className="leading-7 text-[0.95rem]">
              Lorem ipsum dolor sit amet consectetur adipiscing elit ultrices
              scelerisque mi sed interdum lacus tellus in mi orc, netus nisl
              laoreet phasellus. Pellentesque non nunc placerat mi quis vitae
              cursus ornare.
            </span>
          </div>
          <div className="flex flex-col gap-4">
            <span className="font-medium text-xl">Rita Shah</span>
            <span className="leadeing-7 text-[0.95rem] text-gray">
              Manager at Hotel Annapurna
            </span>
          </div>
          <div className="flex gap-2 absolute top-6 right-10">
            <div>
              <Button
                variant={"outline"}
                className="rounded-full w-12 h-12 flex justify-center items-center"
              >
                <Icon name="arrow_back_ios" className="ml-2" />
              </Button>
            </div>
            <div>
              <Button className="rounded-full w-12 flex justify-center items-center h-12 ">
                <Icon name="arrow_forward_ios" className="" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TestimonialSection;
