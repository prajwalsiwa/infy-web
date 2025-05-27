import PackageFilter from "../../components/SearchDetails/packages/PackageFilter/PackageFilter";
import PackageList from "../../components/SearchDetails/packages/PackageList/PackageList";

function Packages() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[25%_75%] gap-4 w-full h-full lg:container lg:px-4 px-1">
      {/* PackageFilter */}
      <div className="w-full lg:block hidden h-full">
        <PackageFilter />
      </div>
      {/* PackageList */}
      <div className="w-full ">
        <PackageList />
      </div>
    </div>
  );
}

export default Packages;
