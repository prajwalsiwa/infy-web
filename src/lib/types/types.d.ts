declare interface TrendingCardProps {
  title: string;
  listingNumber: number;
  imgSrc: string;
}

declare interface HotelCardProps {
  id: number;
  name: string;
  address: string;
  ratings: number;
  discount_percentage: number;
  original_price: number;
  photo_url?: string | StaticImageData;
}

declare interface ChooseUsCardProps {
  title: string;
  info: string;
  imgSrc: string;
}
