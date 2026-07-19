export function prefixBase(path, base) {
  const normalizedBase = base.replace(/\/$/, "");
  return `${normalizedBase}/${path.replace(/^\//, "")}`;
}

export function withBase(path) {
  return prefixBase(path, import.meta.env.BASE_URL);
}
