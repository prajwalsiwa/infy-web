import hotelImage from "@/assets/Images/hotleImage.png";

export const destinations = [
  { title: "Kathmandu", listingNumber: 32, imgSrc: "/kathmandu.jpg" },
  { title: "Pokhara", listingNumber: 22, imgSrc: "/pokhara.jpg" },
  { title: "Chitwan", listingNumber: 15, imgSrc: "/chitwan.jpg" },
];

export const hotelLists = [
  {
    id: 1, 
    title: "Mountain View Hotel",
    address: "Pokhara, Nepal",
    imgUrl: hotelImage,
    price: 5000,
    discountPercent: 20,
    rating: 4.5,
  },
  {
    id: 2,
    title: "Ocean Breeze Resort",
    address: "Chitwan, Nepal",
    imgUrl: hotelImage,
    price: 8000,
    discountPercent: 15,
    rating: 4.7,
  },
  {
    id: 3, 
    title: "City Central Hotel",
    address: "Kathmandu, Nepal",
    imgUrl: hotelImage,
    price: 4500,
    discountPercent: 10,
    rating: 4.2,
  },
  {
    id: 4, 
    title: "Lakeside Retreat",
    address: "Pokhara, Nepal",
    imgUrl: "/path/to/lakeside-retreat.jpg",
    price: 6000,
    discountPercent: 25,
    rating: 4.8,
  },
];
