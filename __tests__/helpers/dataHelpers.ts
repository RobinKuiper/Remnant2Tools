import { calculateWeightType } from "../../src/dataHelpers";

describe("calculateWeightType", () => {
  it('should return "Ultra Heavy" when weight is greater than 75', () => {
    const weight = 80;
    const result = calculateWeightType(weight);
    expect(result).toBe("Ultra Heavy");
  });

  it('should return "Heavy" when weight is greater than 50', () => {
    const weight = 60;
    const result = calculateWeightType(weight);
    expect(result).toBe("Heavy");
  });

  it('should return "Medium" when weight is greater than 25', () => {
    const weight = 30;
    const result = calculateWeightType(weight);
    expect(result).toBe("Medium");
  });

  it('should return "Light" when weight is less than or equal to 25', () => {
    const weight = 20;
    const result = calculateWeightType(weight);
    expect(result).toBe("Light");
  });
});
