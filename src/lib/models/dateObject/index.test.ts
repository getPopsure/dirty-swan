import { dateObjectToISODate, DateObject } from ".";

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
