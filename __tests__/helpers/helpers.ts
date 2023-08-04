import { findImage, slugify } from "../../src/helpers";

describe("findImage", () => {
  const images = {
    1: { name: "image1", relativePath: "/path/to/image1.jpg" },
    2: { name: "image2", relativePath: "/path/to/image2.jpg" },
    3: { name: "image3", relativePath: "/path/to/image3.jpg" },
    4: { name: "image1", relativePath: "/path/to/image6.jpg" },
  };

  it("should return null if images is null", () => {
    const result = findImage("image1", null, "/path/to/");
    expect(result).toBeNull();
  });

  it("should return null if no matching image is found", () => {
    const result = findImage("image4", images, "/path/to/");
    expect(result).toBeNull();
  });

  it("should return the matching image if found", () => {
    const result = findImage("image2", images, "/path/to/");
    expect(result).toEqual(images[2]);
  });

  it("should return the first matching image if multiple images match", () => {
    const result = findImage("image1", images, "/path/to/");
    expect(result).toEqual(images[1]);
  });
});

describe("slugify", () => {
  it("converts string to lowercase and removes spaces, hyphens, forward slashes, single quotes, and double quotes", () => {
    const result = slugify("Hello World - / ' \" Test");
    expect(result).toBe("hello_world_______test");
  });

  it("handles an empty string", () => {
    const result = slugify("");
    expect(result).toBe("");
  });

  it("handles a string with only spaces, hyphens, forward slashes, single quotes, and double quotes", () => {
    const result = slugify(" - / ' \" ");
    expect(result).toBe("_______");
  });

  it("handles a string with no spaces, hyphens, forward slashes, single quotes, and double quotes", () => {
    const result = slugify("helloworldtest");
    expect(result).toBe("helloworldtest");
  });
});
