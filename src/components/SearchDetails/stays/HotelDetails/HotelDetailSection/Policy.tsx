interface PolicySection {
  title: string;
  items: string[];
}

interface PolicyProps {
  sections?: PolicySection[];
  policy?: string[];
}

const Policy: React.FC<PolicyProps> = ({ sections, policy }) => {
  return (
    <div>
      <h1 className="font-medium text-2xl pt-4 leading-[1.815625rem] text-[#353738]">
        Policy
      </h1>
      <div className="policy-container py-4">
        {sections
          ? sections.map((section, index) => (
              <div key={index} className="policy-section mb-6">
                <h2 className="font-medium text-base leading-[1.625rem] mb-2">
                  {section?.title}
                </h2>
                <ul className="list-disc pl-5">
                  {section?.items?.map((item, idx) => (
                    <li
                      key={idx}
                      className="text-grey-700 font-normal text-base leading-[1.75rem]"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))
          : policy?.map((item, index) => (
              <ul key={index} className="list-disc pl-5">
                <li className="text-grey-700 font-normal text-base leading-[1.75rem]">
                  {item.replace(/<\/?p>/g, "")}
                </li>
              </ul>
            ))}
      </div>
    </div>
  );
};

export default Policy;
