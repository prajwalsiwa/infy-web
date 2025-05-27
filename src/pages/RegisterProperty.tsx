import RegisterBanner from "@/components/home/register-property";
import BannerSection from "@/components/home/registerProperty/BannerSection";
import FeaturesSection from "@/components/home/registerProperty/FeaturesSection";
import TestimonialSection from "@/components/home/registerProperty/Testimonials";
import StepsSection from "@/components/home/registerProperty/StepsSection";
import { useFaqsListQuery } from "@/redux/services/ResgisterPropertyBannerApi";
import FAQs from "@/components/home/registerProperty/FAQs";

function RegisterProperty() {
  const { data: faqsList, isLoading: faqsLoading } = useFaqsListQuery();

  if (faqsLoading) <div>faqs loading..</div>;
  return (
    <div className="flex flex-col gap-20">
      <BannerSection />
      <FeaturesSection />
      <TestimonialSection />
      <StepsSection />
      <FAQs faqsList={faqsList} />
      <RegisterBanner />
    </div>
  );
}

export default RegisterProperty;
