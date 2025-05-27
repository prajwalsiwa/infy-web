import CheckboxList from "../../ui/FilterSection/CheckBoxList";

interface DealsProps {
  deals: { id: number; label: string; count: number }[];
}

function Deals({ deals }: DealsProps) {
  return (
    <div>
      <CheckboxList title="Deals" items={deals} />
    </div>
  );
}

export default Deals;
