/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import CheckboxList from "../../ui/FilterSection/CheckBoxList";
import { useSearchParams } from "react-router-dom";

interface RelatedPaymentsProps {
  paymentsData: { title: string; value: number; search_params: string }[];
}

const RelatedPayments: React.FC<RelatedPaymentsProps> = ({ paymentsData }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [selected, setSelected] = React.useState<string[]>([]);

  const handleSelectionChange = (newSelected: string[]) => {
    setSelected(newSelected);

    // Clear all payment filters
    paymentsData.forEach((item) => {
      searchParams.delete(item.search_params);
    });

    // Set selected filters
    paymentsData
      .filter((item) => newSelected.includes(item.title))
      .forEach((item) => {
        searchParams.set(item.search_params, "true");
      });

    setSearchParams(searchParams);
  };

  const paymentMethods = paymentsData.map((item, index) => ({
    id: index,
    label: item.title,
    count: item.value,
  }));

  React.useEffect(() => {
    let changed = false;

    paymentsData.forEach((item) => {
      if (searchParams.has(item.search_params)) {
        searchParams.delete(item.search_params);
        changed = true;
      }
    });

    if (changed) {
      setSearchParams(searchParams);
    }
  }, []);

  return (
    <CheckboxList
      setSelected={(value) => {
        const newSelected = typeof value === "function" ? value(selected) : value;
        handleSelectionChange(newSelected);
      }}
      selected={selected}
      title="Related Payments"
      items={paymentMethods}
    />
  );
};

export default RelatedPayments;
