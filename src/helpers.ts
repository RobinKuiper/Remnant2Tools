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

export const calculatePercentage = (amount: number, total: number, decimals: number = 2) => {
  return +parseFloat(((amount / total) * 100) as string).toFixed(decimals);
};
