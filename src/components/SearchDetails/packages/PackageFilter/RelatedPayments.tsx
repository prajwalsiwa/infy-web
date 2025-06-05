import { paymentMethods } from "@/lib/constants/staysFilter";

type PaymentMethod = {
  id: number;
  label: string;
  count: number;
};

type RelatedPaymentsListProps = {
  paymentsData: PaymentMethod[];
};

function RelatedPaymentsList({ paymentsData }: RelatedPaymentsListProps) {
  return (
    <ul>
      {paymentsData.map((payment) => (
        <li key={payment.id}>
          {payment.label} ({payment.count})
        </li>
      ))}
    </ul>
  );
}

function RelatedPayments() {
  return <RelatedPaymentsList paymentsData={paymentMethods} />;
}

export default RelatedPayments;
