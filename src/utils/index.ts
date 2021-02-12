export const randomInRange = (start: number, end: number) =>
  Math.random() * (end - start) + start;

export const randomIntegerInRange = (start: number, end: number) =>
  Math.floor(randomInRange(start, end));

export const formatThousand = (amount: number | string) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  return amount.toString().replace(regex, ',');
};
