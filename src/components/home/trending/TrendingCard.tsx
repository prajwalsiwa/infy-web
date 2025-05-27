import { Link, useSearchParams } from "react-router-dom";

const TrendingCard = ({ title, listingNumber, imgSrc }: TrendingCardProps) => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get("tab") || "stays";
  const packageRoute = `/search/package-list?tab=${activeTab}&city=${title}`;
  const staysRoute = `/search/hotel-list?tab=${activeTab}&city=${title}`;
  return (
    <Link
      to={activeTab === "stays" ? staysRoute : packageRoute}
      className="trending-card"
    >
      <img
        src={imgSrc}
        width={600}
        height={300}
        alt="pokhara"
        className="w-full h-[200px] rounded-xl object-cover object-center"
      />

      {/* Card Info */}
      <div className="trending-card_title">
        <h3 className="text-xl text-white font-medium">{title}</h3>
        <p className="text-xs text-white font-light">
          {listingNumber} Listings
        </p>
      </div>
    </Link>
  );
};

export default TrendingCard;
