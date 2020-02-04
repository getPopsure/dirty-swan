import { dateObjectToISODate, isoStringtoDateObject, DateObject } from ".";

describe("Date object to ISO date", () => {
  it("Should add trailing 0s", () => {
    const expectedOutput = "2019-04-09";
    const input: DateObject = { day: 9, month: 4, year: 2019 };

    expect(dateObjectToISODate(input)).toEqual(expectedOutput);
  });

  it("Should format date correctly", () => {
    const expectedOutput = "2019-10-29";
    const input: DateObject = { day: 29, month: 10, year: 2019 };

    expect(dateObjectToISODate(input)).toEqual(expectedOutput);
  });
});

describe("ISO string to DateObject", () => {
  test("Should convert valid ISO 8601 string to DateObject", () => {
    expect(isoStringtoDateObject("1990-03-24")).toEqual({
      year: 1990,
      month: 3,
      day: 24
    });
  });

  test("Converting invalid ISO 8601 string to DateObject should be undefined", () => {
    expect(isoStringtoDateObject("1990-24-03")).toBeUndefined();
  });
});
