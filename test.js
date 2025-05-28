const { getPrice } = require("./rentalPrice");

test("ban for driver with less than 1 year of license", () => {
    const result = getPrice("2024-07-02", "2024-07-06", "Compact", 26, 0.8);
    expect(result).toBe("Driver's license held for less than a year");
});

test("ban for driver under 18", () => {
    const result = getPrice("2024-07-02", "2024-07-06", "Compact", 16, 2);
    expect(result).toBe("Driver too young - cannot quote the price");
});

test("ban for driver under 21 with non-compact car", () => {
    const result = getPrice("2024-07-02", "2024-07-06", "Electric", 19, 2);
    expect(result).toBe("Drivers 21 y/o or less can only rent Compact vehicles");
});

test("rental price for a young driver with a compact car", () => {
    const result = getPrice("2024-07-02", "2024-07-06", "Compact", 21, 2);
    expect(result).toBe("$156.60");
});

test("rental price for a driver with a racer car in high season", () => {
    const result = getPrice("2024-07-02", "2024-07-06", "Racer", 23, 3);
    expect(result).toBe("$105.80");
});

test("rental price for a driver with less than 2 years of license", () => {
    const result = getPrice("2024-07-02", "2024-07-06", "Compact", 27, 1.5);
    expect(result).toBe("$161.46");
});

test("rental price for a driver with less than 3 years of license in high season", () => {
    const result = getPrice("2024-07-02", "2024-07-06", "Compact", 27, 2.5);
    expect(result).toBe("$184.20");
});

test("rental price for a driver with more than 10 days in low season", () => {
    const result = getPrice("2024-01-02", "2024-01-13", "Compact", 31, 5);
    expect(result).toBe("$309.69");
});

test("rental price for a driver with more than 10 days in high season", () => {
    const result = getPrice("2024-07-02", "2024-07-13", "Compact", 31, 5);
    expect(result).toBe("$395.71");
});

test("rental price for a driver with pickup date in low season and dropoff date in high season", () => {
    const result = getPrice("2024-03-29", "2024-04-05", "Compact", 31, 5);
    expect(result).toBe("$220.10");
});

test("rental price for a driver with pickup date in high season and dropoff date in low season", () => {
    const result = getPrice("2024-10-31", "2024-11-03", "Compact", 31, 5);
    expect(result).toBe("$108.73");
});

test("rental price for a driver with pickup date in high season and dropoff date in high season", () => {
    const result = getPrice("2024-05-02", "2024-05-11", "Compact", 31, 5);
    expect(result).toBe("$324.41");
});

test("50 year old driver rents a car for three days: Monday, Tuesday, Wednesday", () => {
    const result = getPrice("2025-02-04", "2025-02-06", "Compact", 50, 5);
    expect(result).toBe("$100.00");
});

test("50 year old driver rents a car for three days: Thursday, Friday, Saturday", () => {
    const result = getPrice("2025-02-07", "2025-02-09", "Compact", 50, 5);
    expect(result).toBe("$102.50");
});