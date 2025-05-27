import GuestDetails from "./GuestDetails";
import PaymentTabs from "./PaymentTab";
import hoteLogo from "@/assets/Images/fontisto_hotel.png";
import esewaLogo from "@/assets/Images/esewa-seeklogo.com.png";
import khaltiLogo from "@/assets/Images/khaltilogo.png";
import paypalLogo from "@/assets/Images/paypalLogo.png";
import creditLogo from "@/assets/Images/ph_credit-card-light.png";
import HotelPay from "./HotelPay";
import CreditDebitPayment from "./CreditDebitPayment";
import EsewaPay from "./EsewaPay";
import KhaltiPay from "./KhaltiPay";
import PayPalPay from "./PayPalPay";
import CheckboxWithLabel from "@/components/ui/FormUI/CheckboxInput";
import Label from "@/components/ui/FormUI/Label";
import Input from "@/components/ui/FormUI/Input";
import Icon from "@/components/ui/Icon";
import { ChangeEvent, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useLocation } from "react-router-dom";
import PackageHotelPay from "../PackageCheckout/PackageHotelPay";

const Payments: React.FC = () => {
  const [amount, setAmount] = useState<number>(0);
  const userInfo = useSelector((state: RootState) => state.stays?.userInfo);

  const { pathname } = useLocation();
  const isPackage = pathname.includes("package");
  const tabData = [
    {
      value: "pay-at-hotel",
      label: "Pay at Hotel",
      imgSrc: hoteLogo,
      content: isPackage ? (
        <PackageHotelPay prePayAmount={amount} />
      ) : (
        <HotelPay prePayAmount={amount} />
      ),
    },
    {
      value: "credit-debit-card",
      label: "Credit/Debit Card",
      imgSrc: creditLogo,
      content: <CreditDebitPayment />,
    },
    {
      value: "esewa",
      imgSrc: esewaLogo,
      content: <EsewaPay />,
    },
    {
      value: "khalti",
      imgSrc: khaltiLogo,
      content: <KhaltiPay />,
    },
    {
      value: "paypal",
      imgSrc: paypalLogo,
      content: <PayPalPay />,
    },
  ];
  const handleEditDetails = () => {
    // Logic for editing guest details
  };
  const paymentChange = (e: ChangeEvent<HTMLInputElement>) => {
    const amount = Number(e?.target?.value);
    setAmount(amount);
  };

  return (
    <div className="gap-3 flex flex-col">
      <GuestDetails
        name={userInfo?.name}
        phoneNumber={userInfo?.mobile_number}
        email={userInfo?.email}
        onEdit={handleEditDetails}
      />
      <div className="Booking Section flex flex-col gap-6">
        <span className="font-medium text-xl">Pay with</span>

        <div className="flex flex-col gap-3">
          <div>
            <CheckboxWithLabel label="Do the full payment" />
          </div>
          <div className="   flex gap-1  flex-col">
            <Label className="flex items-center gap-1" htmlFor="amount">
              Pre-payment Amount{" "}
              <Icon name="info" className="!text-sm items-center" />{" "}
              <span className="text-red-500">*</span>
            </Label>
            <div className="relative">
              <span className="absolute  left-3 top-2 text-gray">NRS |</span>
              <Input
                type="number"
                id="amount"
                placeholder="Amount"
                className="border  rounded !bg-white hover:!border-primary w-1/2 pl-14"
                value={amount}
                onChange={(e) => paymentChange(e)}
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border p-4">
          <PaymentTabs tabs={tabData} defaultValue="pay-at-hotel" />
        </div>
      </div>
    </div>
  );
};

export default Payments;
