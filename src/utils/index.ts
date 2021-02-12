export const randomInRange = (start: number, end: number) =>
  Math.random() * (end - start) + start;

export const randomIntegerInRange = (start: number, end: number) =>
  Math.floor(randomInRange(start, end));

export const formatThousand = (amount: number | string) => {
  const regex = /\B(?=(\d{3})+(?!\d))/g;
  return amount.toString().replace(regex, ',');
};

export const classnames = (...args: any[]) => {
  const classes = args.map((arg) => {
    if (typeof arg === 'string') return arg;
    if (Array.isArray(arg)) return arg.flat();
    if (typeof arg === 'object') {
      return Object.entries(arg).map(([key, value]) => {
        if (value) return key;
        return '';
      });
    }
    return '';
  });
  return classes.flat().filter(Boolean).join(' ');
};
