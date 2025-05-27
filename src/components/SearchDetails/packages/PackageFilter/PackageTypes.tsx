import { hotelPackagesTypes } from "@/lib/constants/packageLists";
import CheckboxList from "../../ui/FilterSection/CheckBoxList";

function PackageTypes() {
  return (
    <div>
      <CheckboxList title="Package Type" items={hotelPackagesTypes} />
    </div>
  );
}

export default PackageTypes;
