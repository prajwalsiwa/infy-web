import SearchSection from "../../ui/FilterSection/SearchSection";

interface PackageSearchSectionProps {
  title: string;
}

function PackageSearchSection({ title }: PackageSearchSectionProps) {
  return (
    <div className="w-full">
      <SearchSection title={title} />
    </div>
  );
}

export default PackageSearchSection;
