import { format } from "date-fns";

/**
 * Formats a Date object to "MMMM dd" (Month Day) format.
 *
 * @param {Date} date - The date to format.
 * @returns {string} - Formatted date (e.g., "December 01").
 */
const formatDateToMonthYear = (date: Date) => {
  const dateString = new Date(date);
  const formattedDate = format(dateString, "MMMM dd");
  return formattedDate;
};

export { formatDateToMonthYear };

/**
 * Converts a File object to a Base64-encoded string.
 *
 * @param file - The file to be converted.
 * @returns A Promise that resolves with the Base64 string of the file or rejects with an error.
 */
const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
    reader.readAsDataURL(file);
  });
};

export { convertFileToBase64 };
