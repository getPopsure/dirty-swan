import { fillArray, daysInMonthOfYear } from ".";

describe("fillArray tests", () => {
  it("Should fill array from 1 to 10 ascending", () => {
    const expectedOutput = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    expect(fillArray(1, 10)).toEqual(expectedOutput);
  });

  it("Should fill array from 10 to 5 descending", () => {
    const expectedOutput = [10, 9, 8, 7, 6, 5];

    expect(fillArray(10, 5)).toEqual(expectedOutput);
  });
});

describe("Days for month in year", () => {
  it("Should return 28 for February 2019", () => {
    expect(daysInMonthOfYear({ month: 2, year: 2019 })).toEqual(28);
  });

  it("Should return 31 for January 2019", () => {
    expect(daysInMonthOfYear({ month: 1, year: 2019 })).toEqual(31);
  });

  it("Should return 29 for February 2016", () => {
    expect(daysInMonthOfYear({ month: 2, year: 2016 })).toEqual(29);
  });

  it("Should return 31 for October 2016", () => {
    expect(daysInMonthOfYear({ month: 10, year: 2016 })).toEqual(31);
  });
});
