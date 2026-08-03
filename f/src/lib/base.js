const base = import.meta.env.BASE_URL.replace(/\/$/, "");
export const withBase = (value = "") => {
  if (/^(?:https?:|mailto:|tel:|#)/.test(value)) return value;
  return `${base}/${String(value).replace(/^\//, "")}`;
};
