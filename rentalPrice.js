class CarRental {
    static price(pickupDate, dropoffDate, carType, driverAge, licenseDuration) {
        const rentalDays = getRentalDays(pickupDate, dropoffDate);
        const season = getSeason(pickupDate);

        if (isNaN(new Date(pickupDate)) || isNaN(new Date(dropoffDate))) {
            return "Invalid date format";
        }

        if (licenseDuration < 1) {
            return "Driver must have held a license for at least a year";
        }

        if (driverAge < 18) {
            return "Driver too young - cannot quote the price";
        }

        if (driverAge <= 21 && carType !== "Compact") {
            return "Drivers 21 y/o or less can only rent Compact vehicles";
        }

        let rentalPrice = driverAge * rentalDays;

        if (carType === "Racer" && driverAge <= 25 && season !== "Low") {
            rentalPrice *= 1.5;
        }

        if (season === "High") {
            rentalPrice *= 1.15;
        }

        if (licenseDuration < 2) {
            rentalPrice *= 1.3;
        }

        if (licenseDuration < 3 && season === "High") {
            rentalPrice += 15 * rentalDays;
        }

        if (rentalDays > 10 && season === "Low") {
            rentalPrice *= 0.9;
        }

        rentalPrice += getWeekendExtraCharge(pickupDate, dropoffDate, driverAge);

        return "$" + rentalPrice.toFixed(2);
    }
}

function getRentalDays(pickupDate, dropoffDate) {
    const oneDay = 24 * 60 * 60 * 1000;
    const firstDate = new Date(pickupDate);
    const secondDate = new Date(dropoffDate);
    return Math.max(Math.round((secondDate - firstDate) / oneDay) + 1, 1);
}

function getSeason(pickupDate) {
    const month = new Date(pickupDate).getMonth() + 1;
    return month >= 4 && month <= 10 ? "High" : "Low";
}

function getWeekendExtraCharge(pickupDate, dropoffDate, driverAge) {
    let date = new Date(pickupDate);
    const endDate = new Date(dropoffDate);
    let extraCharge = 0;

    while (date <= endDate) {
        const day = date.getDay();
        if (day === 6 || day === 0) {
            extraCharge += driverAge * 0.05;
        }
        date.setDate(date.getDate() + 1);
    }

    return extraCharge;
}

module.exports = { CarRental, price: CarRental.price };