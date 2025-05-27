// src/components/Submit/Policies.tsx

interface Policy {
  policy_category: string;
  policy_sub_category: string;
  policy: string;
}

interface PoliciesProps {
  policies: Policy[];
}

const Policies = ({ policies }: PoliciesProps) => {
  return (
    <div>
      <div className="font-medium py-4 text-[1rem] text-primary-dark">
        <span>Policies</span>
      </div>
      <div className="flex flex-col gap-4">
        {policies.map((policyCategory, index) => (
          <div key={index} className="flex flex-col gap-1">
            <div>
              <span className="text-gray-dark font-medium text-[1rem]">
                {policyCategory.policy_category}
              </span>
            </div>
            <div className="flex flex-col pl-2">
              <div className="text-gray-dark font-normal text-[0.9rem]">
                <ul className="list-disc pl-5">
                  <li>{policyCategory.policy_sub_category}</li>
                </ul>
              </div>
              <div className="text-grey-600 font-normal text-[0.9rem]">
                <ul className="list-disc pl-5">
                  <li>{policyCategory.policy}</li>
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Policies;
