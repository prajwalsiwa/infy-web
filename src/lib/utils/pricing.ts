export const getDiscountedPrice = ({
  price,
  discountPercent,
}: {
  price: number;
  discountPercent: number;
}) => {
  const discountedPrice = price / discountPercent;
  const priceAfterDiscount = price - discountedPrice;

  return Math.round(priceAfterDiscount);
};
