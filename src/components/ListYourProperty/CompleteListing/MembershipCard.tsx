import React, { useEffect, useState } from "react";
import { getMembershipPlansResponse } from "@/redux/features/Types/listYourProperty";
import { useFormContext } from "react-hook-form";

interface MembershipPlan {
  plans: getMembershipPlansResponse[] | undefined;
}

const MembershipCard: React.FC<MembershipPlan> = ({ plans }) => {
  const { setValue, getValues } = useFormContext();

  const [selectedPlan, setSelectedPlan] = useState<string>("");

  // On mount: Read the existing membership from form state if available
  useEffect(() => {
    const existingMembershipId = getValues("membership.membership");

    if (existingMembershipId && plans?.length) {
      // Find the plan name that matches the stored ID
      const existingPlan = plans.find((plan) => plan.id === existingMembershipId);
      if (existingPlan) {
        setSelectedPlan(existingPlan.name);
      } else {
        // If not found, default to Basic Membership
        setSelectedPlan("Basic Membership");
      }
    } else {
      // No existing selection: Default to Basic Membership
      setSelectedPlan("Basic Membership");
    }
  }, [plans, getValues]);

  // When selection changes, update form state
  useEffect(() => {
    const selectedPlanObj = plans?.find((plan) => plan.name === selectedPlan);
    if (selectedPlanObj?.id) {
      setValue("membership.membership", selectedPlanObj.id);
    }
  }, [selectedPlan, plans, setValue]);

  return (
    <div className="flex w-full justify-center gap-4">
      {plans?.map((plan) => (
        <div
          key={plan.name}
          onClick={() => setSelectedPlan(plan.name)}
          className={`cursor-pointer w-full border relative rounded-lg p-4 transition-shadow ${
            selectedPlan === plan.name
              ? "border-primary border-2 shadow-lg"
              : "border-gray-300"
          }`}
        >
          {plan.id === 3 && (
            <div className="text-sm h-8 w-full absolute text-primary font-semibold bg-primary-light right-0 top-0 rounded-tl-lg rounded-tr-lg flex items-center justify-center">
              Popular
            </div>
          )}

          {/* Selection Icon */}
          <div className="flex justify-end mt-8">
            <i
              className={`material-icons font-bold text-md ${
                selectedPlan === plan.name ? "text-primary" : "text-grey-300"
              }`}
            >
              {selectedPlan === plan.name ? "check_circle" : "circle"}
            </i>
          </div>

          {/* Plan Details */}
          <div className="flex flex-col-reverse">
            <h3 className="text-lg text-gray-dark">{plan.name}</h3>
          </div>

          {/* Price Section */}
          <p className="text-lg text-gray-dark font-medium mt-2">
            {plan.price}
            <span className="text-gray">
              /{plan.expires_on && plan.expires_on / 30 >= 1 ? "month" : "day"}
            </span>
          </p>

          {/* Plan Description */}
          <div
            className="text-gray-dark mt-2 list-disc pl-5 [&>ul]:list-disc [&>ul]:pl-4 [&>li]:mb-1"
            dangerouslySetInnerHTML={{ __html: plan.description }}
          />
        </div>
      ))}
    </div>
  );
};

export default MembershipCard;
