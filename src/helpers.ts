export const getPageType = (path: string): string => path.split("/")[1];

export const findImage = (name: string, images: any, filterRelativePath: string, placeholder: boolean = true) => {
  if (!images) {
    return null;
  }

  return (
    Object.values(images).find(i => i.name === slugify(name) && i.relativePath.includes(filterRelativePath)) ||
    (placeholder ? Object.values(images).find(i => i.name === "placeholder") : null)
  );
};

export const findImageById = (id: number, images: any, placeholder: boolean = true) => {
  if (!images) {
    return null;
  }

  return (
    Object.values(images).find(i => i.fields && i.fields.itemId === id) ||
    (placeholder ? Object.values(images).find(i => i.name === "placeholder") : null)
  );
};

export const slugify = (str: string) => {
  return str
    .replace(/[\s-/]/g, "_")
    .replace(/[\s:'"]/g, "")
    .toLowerCase()
    .trim();
};

export const unslugify = (str: string) => {
  return str
    .replace(/[\s_]/g, " ")
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
};

export const calculatePercentage = (amount: number, total: number, decimals: number = 2) => {
  return +parseFloat(((amount / total) * 100) as string).toFixed(decimals);
};

export const camelCaseToText = (camelCaseString: string): string => {
  return camelCaseString
    .replace(/([a-z])([A-Z])/g, "$1 $2") // Insert space before capital letters
    .replace(/([A-Z])([A-Z][a-z])/g, "$1 $2") // Insert space between consecutive capital letters followed by a lowercase letter
    .toLowerCase() // Convert to lowercase
    .replace(/(^|\s)(\w)/g, (match, p1, p2) => p1 + p2.toUpperCase()); // Capitalize the first letter of each word
};

export const calculateStringMatchPercentage = (string1, string2) => {
  const length1 = string1.length;
  const length2 = string2.length;
  const maxLength = Math.max(length1, length2);
  let matchCount = 0;

  for (let i = 0; i < maxLength; i++) {
    if (string1[i] === string2[i]) {
      matchCount++;
    }
  }

  const matchPercentage = (matchCount / maxLength) * 100;
  return matchPercentage.toFixed(2); // Return the match percentage with 2 decimal places
};

export const uppercaseFirstLetter = (word: string): string =>
  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
