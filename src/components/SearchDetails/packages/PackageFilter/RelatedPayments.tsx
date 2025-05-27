import { paymentMethods } from "@/lib/constants/staysFilter";
import CheckboxList from "../../ui/FilterSection/CheckBoxList";

function RelatedPayments() {
  return <CheckboxList title="Payment Related" items={paymentMethods} />;
}

export default RelatedPayments;
