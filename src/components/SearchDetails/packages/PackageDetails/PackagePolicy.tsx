import Policy from "../../stays/HotelDetails/HotelDetailSection/Policy";

interface packagePolicyProps {
  policy?: string[];
}

function PackagePolicy({ policy }: packagePolicyProps) {
  return (
    <div>
      <Policy policy={policy} />
    </div>
  );
}

export default PackagePolicy;
