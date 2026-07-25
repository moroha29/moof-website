export const withBase = (path = "") => {
  const normalized = path.replace(/^\//, "");
  const base = import.meta.env.BASE_URL;
  return `${base.endsWith("/") ? base : `${base}/`}${normalized}`;
};
