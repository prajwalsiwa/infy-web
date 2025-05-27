import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";

export type faq = {
  id: number;
  question: string;
  answer: string;
};

interface faqsProps {
  faqsList?: faq[];
}

function FAQs({ faqsList }: faqsProps) {
  return (
    <div className="flex justify-between px-24 ">
      <div className="w-1/4 justify-center flex mt-2 ">
        <span className="font-medium text-[3rem] text-primary-dark">FAQs</span>
      </div>
      <Accordion type="single" collapsible className="w-3/4">
        {faqsList?.map((faq) => (
          <AccordionItem key={faq.id} value={faq.id.toString()}>
            <AccordionTrigger className="text-[1.35rem] font-normal text-grey-600 no-underline hover:no-underline focus:no-underline">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent className="text-[1rem] text-gray">
              {faq.answer}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}

export default FAQs;
