export const withBase = (path = "") => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${String(path).replace(/^\//, "")}`;
};
