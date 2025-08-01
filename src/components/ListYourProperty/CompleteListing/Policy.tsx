import CheckboxWithLabel from "@/components/ui/FormUI/CheckboxInput";
import { useGetPoliciesQuery } from "@/redux/services/listYourPropertyApi";
import { useFormContext } from "react-hook-form";

function Policy() {
  const { watch, setValue } = useFormContext();
  const { data: policies, isLoading, error } = useGetPoliciesQuery();

  const selectedPolicies = watch("policy");

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading policies.</div>;
  }

  const handleCheckChange = (id: number, isChecked: boolean) => {
    const updated = isChecked
      ? [...(selectedPolicies?.policies ?? []), id]
      : selectedPolicies?.policies.filter(
          (policyId: number) => policyId !== id
        );

    setValue("policy.policies", updated);
  };

  return (
    <div>
      <div className="flex flex-col gap-4">
        {policies?.map((policyCategory, categoryIndex) => (
          <div key={categoryIndex} className="flex flex-col gap-1">
            <div>
              <span className="text-primary-dark font-medium text-[1rem]">
                {policyCategory.policy_category}
              </span>
            </div>
            {policyCategory.policy_sub_category.map(
              (subCategory, subCategoryIndex) => (
                <div key={subCategoryIndex} className="flex flex-col gap-1">
                  <div>
                    <span className="text-gray-dark text-[0.9rem] font-normal">
                      {subCategory.policy_sub_category}
                    </span>
                  </div>
                  {subCategory.policy.map((subItem) => (
                    <CheckboxWithLabel
                      key={subItem.id}
                      label={subItem.policy}
                      checked={selectedPolicies?.policies?.includes(subItem.id)}
                      onChange={(checked: boolean) => handleCheckChange(subItem.id, checked)}
                    />
                  ))}
                </div>
              )
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Policy;
