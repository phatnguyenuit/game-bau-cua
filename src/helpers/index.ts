export const getStaticPath = (path: string, base: string) => {
  let formattedPath = path.replace(/^\//, '').replace(/\/$/, '');
  return `${base}/${formattedPath}`;
};
