export const withBase = (path = "") => {
  const normalized = path.replace(/^\//, "");
  return `${import.meta.env.BASE_URL}${normalized}`;
};
