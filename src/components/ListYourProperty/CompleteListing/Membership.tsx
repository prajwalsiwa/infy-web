import CheckboxWithLabel from "@/components/ui/FormUI/CheckboxInput";
import Icon from "@/components/ui/Icon";
import esewaLogo from "@/assets/Images/esewa-seeklogo.com.png";
import khaltiLogo from "@/assets/Images/khaltilogo.png";
import paypalLogo from "@/assets/Images/paypalLogo.png";
import creditLogo from "@/assets/Images/ph_credit-card-light.png";
import { Separator } from "@/components/ui/Separator";
import MembershipCard from "./MembershipCard";
import { useGetMembershipPlansQuery } from "@/redux/services/listYourPropertyApi";

const tabData = [
  {
    label: "Bank Transfer",
    icon: "account_balance",
  },
  {
    value: "credit-debit-card",
    label: "Credit/Debit Card",
    imgSrc: creditLogo,
  },
  {
    value: "esewa",
    imgSrc: esewaLogo,
  },
  {
    value: "khalti",
    imgSrc: khaltiLogo,
  },
  {
    value: "paypal",
    imgSrc: paypalLogo,
  },
];

function Membership() {
  const { data: planList } = useGetMembershipPlansQuery() || [];

  return (
    <div className="flex gap-6 flex-col">
      <div className="flex flex-col gap-2">
        <span className="text-primary-dark font-medium text-[1rem]">
          Pay at the hotel
        </span>
        <span className="text-gray-dark">
          As default, Guest are not required to pay for booking, they can pay at
          hotel during their stay
        </span>
        <CheckboxWithLabel
          label="pre-payment required (Guest are required to pay first for booking)"
          className="text-gray"
        />
      </div>
      <div className="flex flex-col gap-2">
        <span className="text-primary-dark font-medium text-[1rem] flex gap-1.5 items-center">
          Pay at the hotel
          <span className="text-sm text-gray font-normal">{`(you receive payment through)`}</span>
        </span>
        <div className="rounded-xl border border-gray p-6">
          <div className="flex justify-between items-center px-6">
            {tabData.map((tab) => (
              <div>
                {tab.icon ? (
                  <span className="flex gap-1.5 items-center">
                    <Icon name={tab.icon} />
                    <span>{tab.label}</span>
                  </span>
                ) : (
                  <span className="flex gap-1.5 items-center">
                    <img
                      src={tab.imgSrc}
                      className="text-gray-dark !font-thin"
                    />
                    <span>{tab.label}</span>
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Separator />
      <div className="flex gap-4">
        <span className="text-primary-dark font-medium text-[1rem] flex gap-1.5 items-center">
          Choose Membership
          <span className="text-sm text-gray font-normal">{`(can change later)`}</span>
        </span>
      </div>
      <div>
        <MembershipCard plans={planList} />
      </div>
    </div>
  );
}

export default Membership;
