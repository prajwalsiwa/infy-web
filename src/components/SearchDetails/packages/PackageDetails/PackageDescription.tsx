interface PackageDescriptionProps {
  description?: string;
  whatsIncluded?: string[];
  date: {
    start?: string;
    end?: string;
  };
}

function PackageDescription({
  description,
  whatsIncluded,
  date,
}: PackageDescriptionProps) {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col gap-6">
        {/* Hosted By Section */}
        <div>
          <span className="text-grey-800">
            Package is hosted by{" "}
            <a href="" className="text-primary-dark font-medium">
              {"-"}
            </a>
          </span>
        </div>

        {/* What You'll Do Section */}
        <div className="flex flex-col gap-2">
          <span className="title text-lg">What you'll do</span>
          <span className="description text-grey-800">{description}</span>
        </div>

        {/* What's Included Section */}
        <div className="flex flex-col gap-2">
          <span className="title text-lg">What's Included</span>
          <ul className="description pl-4 list-disc">
            {whatsIncluded?.map((item, index) => (
              <li key={index} className="text-gray-800">
                {item.replace(/<\/?p>/g, "")}
              </li>
            ))}
            <li className="text-gray-800">Audio with explanations</li>
            <li className="text-gray-800">Guided tour</li>
          </ul>
        </div>
      </div>

      {/* Date and Time Section */}
      <div className="flex flex-col gap-4 w-full lg:pr-32">
        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
          <div className="flex flex-col">
            <span className="title text-lg">Date and Time</span>
            <span className="date text-gray-800">{date.start}</span>
          </div>
          <div className="hidden sm:block border-r border-r-grey-400 mx-4"></div>
          <div className="flex flex-col">
            <span className="title text-lg">Book Available until</span>
            <span className="date text-gray-800">{date.end}</span>
          </div>
        </div>
        <div>
          <span className="text-gray">
            Please check the calendar for other available dates.
          </span>
        </div>
      </div>
    </div>
  );
}

export default PackageDescription;
