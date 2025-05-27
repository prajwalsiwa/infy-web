interface DescriptionProps {
  description: string;
}

function Description({ description }: DescriptionProps) {
  return (
    <div className="w-full flex flex-col gap-2">
      <div className="max-h-[17.5rem] text-gray-dark">{description}</div>
      <span className="text-primary cursor-pointer hover:text-primary-dark underline">Read More</span>
    </div>
  );
}

export default Description;
