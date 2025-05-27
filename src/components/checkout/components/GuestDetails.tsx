interface GuestDetailsProps {
  name?: string;
  phoneNumber?: string;
  email?: string;
  onEdit?: () => void;
}

function GuestDetails({ name, phoneNumber, email, onEdit }: GuestDetailsProps) {
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-col gap-2">
        <span className="font-medium text-xl">Your Details</span>
        <span className="text-gray">
          We will use these details to share your booking information
        </span>
      </div>

      <div className="flex flex-col w-full pr-20">
        <div className="flex sm:flex-row flex-col  justify-between">
          <div className="flex gap-12">
            <span className="text-gray">Full Name:</span>
            <span>{name}</span>
          </div>
          <div className="flex gap-5">
            <span className="text-gray">Phone Number:</span>
            <span>{phoneNumber}</span>
          </div>
        </div>
        <div className="gap-5 flex">
          <span className="text-gray">Email Address:</span>
          <span>{email}</span>
        </div>
      </div>
      <div>
        <button className="underline" onClick={onEdit}>
          Edit my details
        </button>
      </div>
      <div className="pr-16 mt-2">
        <hr />
      </div>
    </div>
  );
}

export default GuestDetails;
