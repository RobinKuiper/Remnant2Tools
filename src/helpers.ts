export const findImage = (name: string, images: any) => {
  const filtered = images && Object.values(images).filter(i => i.name === slugify(name));
  if (filtered && filtered.length > 0) {
    return filtered[0];
  }

  return null;
};

export const slugify = (str: string) => {
  return str
    .split(" ")
    .join("_")
    .split("-")
    .join("_")
    .split("/")
    .join("_")
    .split("'")
    .join("")
    .split('"')
    .join("")
    .toLowerCase();
};
