import hotelSubImage from "@/assets/Images/hotelsubimage.png";
import hotelImage from "@/assets/Images/hotleImage.png";

const hotelPackagesTypes = [
  { id: 1, label: "Beach Resort Getaway", count: 150 },
  { id: 2, label: "Mountain Adventure", count: 100 },
  { id: 3, label: "City Sightseeing Tour", count: 200 },
  { id: 4, label: "Spa & Wellness Retreat", count: 75 },
  { id: 5, label: "Luxury Cruise Tour", count: 120 },
  { id: 6, label: "Cultural Heritage Tour", count: 95 },
  { id: 7, label: "Wildlife Safari", count: 130 },
  { id: 8, label: "Romantic Honeymoon Package", count: 85 },
  { id: 9, label: "Adventure Sports Getaway", count: 60 },
];

// Sub-images package
const subImageList = [
  { id: 1, subImage: hotelSubImage },
  { id: 2, subImage: hotelSubImage },
  { id: 3, subImage: hotelSubImage },
  { id: 4, subImage: hotelSubImage },
];

// Service package
const serviceList = [
  { service: "Free Wi-Fi" },
  { service: "Swimming Pool" },
  { service: "Gym Access" },
];

// Packaged hotel data list
const packageDataList = [
  {
    hotelImage: hotelImage,
    hotelSubImageList: subImageList,
    title: "Luxury Stay ",
    location: "Kalitmati, Kathmandu",
    ratingCount: 4,
    serviceList: serviceList,
    type: "Resort",
    rating: 4.2,
    reviews: 30,
    originalPrice: 5000,
    discountedPrice: 4500,
  },
  {
    hotelImage: hotelImage,
    hotelSubImageList: subImageList.slice(0, 2),
    title: "Heritage Bliss ",
    location: "Thamel, Kathmandu",
    ratingCount: 5,
    serviceList: serviceList.slice(0, 2),
    type: "Spirituality",
    rating: 4.5,
    reviews: 50,
    originalPrice: 6000,
    discountedPrice: 5500,
  },
  {
    hotelImage: hotelImage,
    hotelSubImageList: subImageList.slice(0, 3),
    title: "Himalayan Paradise Resort",
    location: "Nagarkot, Bhaktapur",
    ratingCount: 4,
    serviceList: serviceList,
    type: "Travel and Outdoor",
    rating: 4.8,
    reviews: 45,
    originalPrice: 7000,
    discountedPrice: 6500,
  },
  {
    hotelImage: hotelImage,
    hotelSubImageList: subImageList.slice(0, 1),
    title: "Everest View ",
    location: "Namche Bazaar, Solukhumbu",
    ratingCount: 5,
    serviceList: serviceList.slice(0, 1),
    type: "Trekking   ",
    rating: 5.0,
    reviews: 60,
    originalPrice: 10000,
    discountedPrice: 9500,
  },
];

const packageDetailTabList = [
  {
    id: 1,
    name: "Description",
  },

  {
    id: 4,
    name: "Reviews",
  },
  {
    id: 5,
    name: "Whre you'll be",
  },
  {
    id: 6,
    name: "Policy",
  },
];

export { hotelPackagesTypes, packageDataList,packageDetailTabList };
