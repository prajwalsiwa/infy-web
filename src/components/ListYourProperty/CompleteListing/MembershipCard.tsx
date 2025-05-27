import React, { useState } from "react";
import { getMembershipPlansResponse } from "@/redux/features/Types/listYourProperty";

interface MembershipPlan {
  plans: getMembershipPlansResponse[] | undefined;
}

const MembershipCard: React.FC<MembershipPlan> = ({ plans }) => {
  const [selectedPlan, setSelectedPlan] = useState<string>("Basic Membership");

  return (
    <div className="flex w-full justify-center gap-4">
      {plans?.map((plan) => (
        <div
          key={plan.name}
          onClick={() => setSelectedPlan(plan.name)}
          className={`cursor-pointer w-full border rounded-lg p-4 transition-shadow ${
            selectedPlan === plan.name
              ? "border-primary border-2 shadow-lg"
              : "border-gray-300"
          }`}
        >
          {/* Selection Icon */}
          <div className="flex justify-end mt-2">
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
            {/* {plan.popular && (
              <span className="text-sm text-primary font-semibold">
                (Popular)
              </span>
            )} */}
          </div>

          {/* Price Section */}
          <p className="text-lg text-gray-dark font-medium mt-2">
            {plan.price}
            <span className="text-gray">/{plan.expires_on / 30 && "month"}</span>
          </p>

          {/* Plan Description */}
          <p className="text-gray-dark mt-2">{plan.description}</p>
        </div>
      ))}
    </div>
  );
};

export default MembershipCard;
