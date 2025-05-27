const ChooseUsCard = ({ title, info, imgSrc }: ChooseUsCardProps) => {
  return (
    <div>
      <div className="bg-background-blue h-[240px] p-4">
        <img
          src={imgSrc}
          width={320}
          height={240}
          alt="deal"
          className="w-auto h-full object-cover object-center mx-auto"
        />
      </div>
      <div className="p-4">
        <h3 className="text-center text-lg text-primary-dark font-medium">
          {title}
        </h3>
        <p className="mt-2 text-gray-dark max-w-xs text-center mx-auto">
          {info}
        </p>
      </div>
    </div>
  );
};

export default ChooseUsCard;
