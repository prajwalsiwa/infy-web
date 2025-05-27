/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormValues } from "./CompleteListing";

export const validateForm = async (data: FormValues) => {
  const errors: Record<string, any> = {};

  // Validation for PropertyInfo
  const trimmedName = data.propertyInfo.name?.trim();

  if (!errors.propertyInfo) {
    errors.propertyInfo = {};
  }

  if (!data.propertyInfo.legal_documents?.length) {
    errors.propertyInfo = {
      ...errors.propertyInfo,
      legal_documents: {
        message: "Please check the required document and upload a valid image.",
      },
    };
  }

  if (!trimmedName) {
    errors.propertyInfo.name = { message: "Property Name is required" };
  } else if (/^\d+$/.test(trimmedName)) {
    errors.propertyInfo.name = {
      message: "Property Name cannot be only numeric",
    };
  } else if (trimmedName.length < 3) {
    errors.propertyInfo.name = {
      message: "Property Name must be at least 3 characters long",
    };
  }

  const size = data.propertyInfo.size;
  if (!size) {
    errors.propertyInfo.size = { message: "Property Size is required" };
  } else if (size <= 0) {
    errors.propertyInfo.size = { message: "Positive number required" };
  }

  // Property website URL validation (optional field)
  const website = data.propertyInfo.website?.trim();
  if (!website) {
    errors.propertyInfo.website = { message: "Website is required" };
  } else if (website && !/^https?:\/\/[^\s/$.?#].[^\s]*$/.test(website)) {
    errors.propertyInfo.website = { message: "Invalid Property Website URL" };
  }

  // Check-In and Check-Out Time validation (optional field)
  const checkInTime = data.propertyInfo.checkin_time;
  const checkOutTime = data.propertyInfo.checkout_time;
  if (checkInTime && !/^\d{2}:\d{2}$/.test(checkInTime)) {
    errors.propertyInfo.checkin_time = {
      message: "Invalid Check-In Time format",
    };
  }
  if (checkOutTime && !/^\d{2}:\d{2}$/.test(checkOutTime)) {
    errors.propertyInfo.checkout_time = {
      message: "Invalid Check-Out Time format",
    };
  }

  // Validation for Location
  if (!errors.location) {
    errors.location = {};
  }

  const { city, streetName, streetNo, country, chowk } = data.location;

  if (!city?.trim()) {
    errors.location.city = { message: "City is required" };
  }
  if (!streetName?.trim()) {
    errors.location.streetName = { message: "Street Name is required" };
  }
  if (!streetNo || streetNo <= 0) {
    errors.location.streetNo = {
      message: "Street No must be a positive number",
    };
  }
  if (!country?.trim()) {
    errors.location.country = { message: "Country is required" };
  }

  if (!chowk?.trim()) {
    errors.location.chowk = { message: "Additional Informatin required" };
  }

  // Postal Code Validation (Optional)
  // if (postalCode?.trim() && !/^\d{4,6}$/.test(postalCode)) {
  //   errors.location.postalCode = { message: "Postal Code must be a 4-6 digit number" };
  // }

  // if (!latitude || isNaN(latitude) || latitude < -90 || latitude > 90) {
  //   errors.location.latitude = { message: "Latitude must be a valid number between -90 and 90" };
  // }
  // if (!longitude || isNaN(longitude) || longitude < -180 || longitude > 180) {
  //   errors.location.longitude = { message: "Longitude must be a valid number between -180 and 180" };
  // }

  // validation for add Room

  // if (!errors.addRoom) {
  //   errors.addRoom = {};
  // }
  // const { name, room_numbers } = data.addRoom;
  // const roomName = name.trim();

  // if (!roomName) {
  //   errors.addRoom.name = { message: "Room Name is required" };
  // } else if (/^\d+$/.test(roomName)) {
  //   errors.addRoom.name = {
  //     message: "Room Name cannot be only numeric",
  //   };
  // } else if (roomName.length < 3) {
  //   errors.addRoom.name = {
  //     message: "Room Name must be at least 3 characters long",
  //   };
  // }

  // if (room_numbers.length <= 0) {
  //   errors.addRoom.room_numbers = { message: "Room number required" };
  // }

  return {
    values: Object.keys(errors).length ? {} : data,
    errors,
  };
};
