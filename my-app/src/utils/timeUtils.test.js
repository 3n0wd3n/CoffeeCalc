import {
  calculateDevelopmentTimes,
  calculateRatios,
  calculateChargeTemp,
  calculateDTRRemainingTimes,
} from "./timeUtils";

describe("timeUtils", () => {
  it("calculates development times between 20 and 25%", () => {
    const result = calculateDevelopmentTimes(100);
    expect(result).toHaveLength(6); // 20,21,22,23,24,25
    expect(result[0].percent).toBe(20);
    expect(result[result.length - 1].percent).toBe(25);
  });

  it("calculates ratio splits from 75 to 80", () => {
    const total = 600; // 10 minutes
    const list = calculateRatios(total);
    expect(list).toHaveLength(6); // 75,76,77,78,79,80
    expect(list[0]).toMatchObject({ percent: 75, firstTime: "07:30", secondTime: "02:30" });
    expect(list[list.length - 1]).toMatchObject({ percent: 80, firstTime: "08:00", secondTime: "02:00" });
  });

  it("calculates charge temp conservative and aggressive", () => {
    // density equal to standard should give 180 regardless of profile
    expect(calculateChargeTemp(630, "conservative")).toBeCloseTo(180);
    expect(calculateChargeTemp(630, "aggressive")).toBeCloseTo(180);
    // 650 conservative: difference 20 -> +2
    expect(calculateChargeTemp(650, "conservative")).toBeCloseTo(182);
    // 650 aggressive: diff 20 -> (20/10*5)=10
    expect(calculateChargeTemp(650, "aggressive")).toBeCloseTo(190);
  });

  it("calculates DTR remaining times correctly", () => {
    const list = calculateDTRRemainingTimes(480); // 8 minutes
    const eighty = list.find((r) => r.percent === 80);
    expect(eighty.remainingTime).toBe("02:00");
    const seventyFive = list.find((r) => r.percent === 75);
    expect(seventyFive.remainingTime).toBe("02:40");
  });
});
