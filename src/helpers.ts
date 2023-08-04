export const findImage = (name: string, images: any, filterRelativePath: string) => {
  if (!images) {
    return null;
  }

  return (
    Object.values(images).find(i => i.name === slugify(name) && i.relativePath.includes(filterRelativePath)) || null
  );
};

export const slugify = (str: string) => {
  return str
    .replace(/[\s-/]/g, "_")
    .replace(/[\s'"]/g, "")
    .toLowerCase()
    .trim();
};
