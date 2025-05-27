/* eslint-disable max-lines */
import detailSubImage from "@/assets/Images/DetailSubImage.png";
import detailHotelImage from "@/assets/Images/DetailHotelImage.png";
import hotelImage from "@/assets/Images/hotleImage.png";
import attractionMap from "@/assets/Images/attractionMap.png";

const imageList = [
  {
    hotelImage: {
      id: 1,
      hotelImage: detailHotelImage,
    },
    hotelSubImage: [
      {
        id: 2,
        hotelSubimage: detailSubImage,
      },
      {
        id: 3,
        hotelSubimage: detailSubImage,
      },
      {
        id: 4,
        hotelSubimage: detailSubImage,
      },
      {
        id: 5,
        hotelSubimage: detailSubImage,
      },
    ],
  },
];

const tabList = [
  {
    id: 1,
    name: "Description",
  },
  {
    id: 2,
    name: "Amenities",
  },
  {
    id: 3,
    name: "Rooms",
  },
  {
    id: 4,
    name: "Reviews",
  },
  {
    id: 5,
    name: "Nearby Attractions",
  },
  {
    id: 6,
    name: "Policy",
  },
];

const description = {
  id: 1,
  descriptionText:
    "A former residence of Prince Roland Bonaparte and listed in the French “Monuments Historiques”, Shangri-La Hotel, Paris is a hotel palace located across the Seine and facing the Eiffel Tower. It reflects both Asian hospitality and French art de vivre. It has 2 restaurants and 1 of which has a Michelin star. An indoor pool and a spa are featured. Place Trocadero can be found 500 metres away.Some rooms and suites at Shangri-La Hotel, Paris offer stunning and unique views of the Eiffel Tower. Apart from the Signature Suites, all rooms and suites are decorated in shades of blue, white and ecru, in keeping with both European Empire and Asian aesthetics. All rooms have a separate living room with desk and a marble bathroom with heated flooring, separate bath and rainfall shower and Guerlain toiletries. The rooms and suites feature custom-made furniture with crystal finishing. A flat-screen TV with in-house movie channels, an iPod dock and a laptop safe are provided.",
};

const amenitiesList = [
  {
    category: "Essentials",
    items: [
      { name: "Wi-Fi", icon: "wifi" },
      { name: "Air Conditioning", icon: "ac_unit" },
      { name: "Elevator", icon: "elevator" },
      { name: "Parking", icon: "local_parking" },
    ],
  },
  {
    category: "Leisure",
    items: [
      { name: "Swimming Pool", icon: "pool" },
      { name: "Gym", icon: "fitness_center" },
      { name: "Spa", icon: "spa" },
      { name: "Garden", icon: "local_florist" },
      { name: "Bar", icon: "local_bar" },
    ],
  },
  {
    category: "Services",
    items: [
      { name: "Room Service", icon: "room_service" },
      { name: "Laundry", icon: "local_laundry_service" },
      { name: "24/7 Reception", icon: "access_alarm" },
      { name: "Business Center", icon: "business_center" },
      { name: "Library", icon: "library_books" },
      { name: "Conference Room", icon: "meeting_room" },
    ],
  },
  {
    category: "Special",
    items: [
      { name: "Pet-Friendly", icon: "pets" },
      { name: "Shuttle Service", icon: "airport_shuttle" },
    ],
  },
];

const roomCardServiceList = [
  { service: "Free Wi-Fi" },
  { service: "Swimming Pool" },
  { service: "Gym Access" },
];

const roomData = [
  {
    roomName: "Classic Room",
    price: 7000,
    discountedPrice: 2000,
    amenities: [
      { icon: "bed", text: "1 King bed" },
      { icon: "distance", text: "25 m²" },
      { icon: "group", text: "2 Adults 1 kid" },
    ],
    services: [
      { service: "Free Wifi" },
      { service: "Ac" },
      { service: "Breakfast" },
      { service: "Bathtub" },
      { service: "Exptess-Check-in" },
      { service: "Refrigerator" },
      { service: "Pool" },
    ],
    imageUrl: hotelImage,
  },
  {
    roomName: "Deluxe Room",
    price: 9000,
    discountedPrice: 2000,
    amenities: [
      { icon: "bed", text: "2 Queen beds" },
      { icon: "distance", text: "35 m²" },
      { icon: "group", text: "3 Adults 2 kids" },
    ],
    services: [
      { service: "wifi" },
      { service: "ac" },
      { service: "breakfast" },
      { service: "parking" },
    ],
    imageUrl: hotelImage,
  },
  {
    roomName: "Deluxe Room",
    price: 9000,
    discountedPrice: 2000,
    amenities: [
      { icon: "bed", text: "2 Queen beds" },
      { icon: "distance", text: "35 m²" },
      { icon: "group", text: "3 Adults 2 kids" },
    ],
    services: [
      { service: "wifi" },
      { service: "ac" },
      { service: "breakfast" },
      { service: "parking" },
    ],
    imageUrl: hotelImage,
  },
];

const ratingBarsData = [
  { label: "Cleanliness", rating: 3.8 },
  { label: "Service", rating: 4.5 },
  { label: "Location", rating: 4.0 },
  { label: "Value", rating: 4.2 },
  { label: "Amenities", rating: 4.1 },
  { label: "Comfort", rating: 3.9 },
];

const commentList = [
  {
    photoUrl: "https://via.placeholder.com/150",
    name: "Alice Johnson",
    date: "November 15, 2024",
    rating: 4.7,
    description:
      "Fantastic experience! The staff was friendly and the ambiance was great.",
  },
  {
    photoUrl: "https://via.placeholder.com/150",
    name: "Michael Brown",
    date: "November 18, 2024",
    rating: 3.5,
    description:
      "The service was decent, but the cleanliness could have been better.",
  },
  {
    photoUrl: "https://via.placeholder.com/150",
    name: "Sophia Martinez",
    date: "November 20, 2024",
    rating: 5.0,
    description:
      "Absolutely loved it! Highly recommend this place to everyone.",
  },
  {
    photoUrl: "https://via.placeholder.com/150",
    name: "David Lee",
    date: "November 19, 2024",
    rating: 4.0,
    description:
      "Great service and excellent value for money. Will visit again!",
  },
];

const attractionsMapData = {
  image: attractionMap, // Dynamic image URL
  attractionList: [
    {
      name: "City Stadium",
      distance: "0.3kms",
    },
    {
      name: "National Park",
      distance: "2.1kms",
    },
    {
      name: "Beach Resort",
      distance: "5.0kms",
    },
    {
      name: "Beach Resort",
      distance: "5.0kms",
    },
    {
      name: "Beach Resort",
      distance: "5.0kms",
    },
    {
      name: "Beach Resort",
      distance: "5.0kms",
    },
    {
      name: "Beach Resort",
      distance: "5.0kms",
    },
    {
      name: "Beach Resort",
      distance: "5.0kms",
    },
    {
      name: "Beach Resort",
      distance: "5.0kms",
    },
    // More attractions...
  ],
};

const policyData = [
  {
    title: "Early Check-in",
    items: [
      "Guests may check in as early as 12:00 PM, subject to room availability.",
      "Early check-ins are not guaranteed and are provided on a first-come, first-served basis.",
      "A fee may apply for check-ins before the standard time of 3:00 PM.",
    ],
  },
  {
    title: "Late Check-in",
    items: [
      "Late check-ins can be arranged until 10:00 PM. Please inform us in advance if arriving after this time.",
      "Check-ins after 10:00 PM may be subject to an additional fee.",
      "For check-ins after midnight, please contact the front desk to make arrangements.",
    ],
  },
  {
    title: "Cancellation Policy",
    items: [
      "Free cancellation is allowed up to 24 hours before the scheduled arrival date.",
      "Cancellations made within 24 hours will incur a charge of one night’s stay.",
      "No-show reservations will be charged the full amount of the stay.",
    ],
  },
  {
    title: "Pet Policy",
    items: [
      "Pets are welcome with a non-refundable fee of $50 per stay.",
      "Guests are allowed up to two pets per room, with a weight limit of 25 lbs per pet.",
      "Pets must be kept on a leash at all times in public areas.",
    ],
  },
  {
    title: "Smoking Policy",
    items: [
      "This is a smoke-free property. Smoking is only allowed in designated smoking areas.",
      "A cleaning fee of $250 will be charged if there is evidence of smoking in the room.",
      "Vaping is also prohibited in all areas of the property.",
    ],
  },
  {
    title: "Parking Policy",
    items: [
      "Parking is available for $10 per night in our secure lot.",
      "Guests must park in designated spaces only. Unauthorized vehicles will be towed at the owner’s expense.",
      "Electric vehicle charging stations are available in the parking lot for a fee of $5 per use.",
    ],
  },
];

export {
  imageList,
  tabList,
  description,
  amenitiesList,
  roomCardServiceList,
  roomData,
  ratingBarsData,
  commentList,
  attractionsMapData,
  policyData,
};
