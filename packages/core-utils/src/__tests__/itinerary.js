import {
  calculateTncFares,
  getCompanyFromLeg,
  getDisplayedStopId,
  getLegCost,
  isTransit
} from "../itinerary";

const bikeRentalItinerary = require("./__mocks__/bike-rental-itinerary.json");
const tncItinerary = require("./__mocks__/tnc-itinerary.json");

const basePlace = {
  lat: 0,
  lon: 0,
  name: "stop"
};

describe("util > itinerary", () => {
  describe("isTransit", () => {
    it("should work", () => {
      expect(isTransit("CAR")).toBeFalsy();
      expect(isTransit("BUS")).toBeTruthy();
    });
  });

  describe("getCompanyFromLeg", () => {
    it("should return company for bike rental leg", () => {
      const company = getCompanyFromLeg(bikeRentalItinerary.legs[1]);
      expect(company).toEqual("GBFS");
    });

    it("should return company for TNC leg", () => {
      const company = getCompanyFromLeg(tncItinerary.legs[0]);
      expect(company).toEqual("uber");
    });
  });

  describe("calculateTncFares", () => {
    it("should return the correct amounts and currency for an itinerary with TNC", () => {
      const fareResult = calculateTncFares(tncItinerary, true);
      expect(fareResult.currencyCode).toEqual("USD");
      expect(fareResult.maxTNCFare).toEqual(38);
      expect(fareResult.minTNCFare).toEqual(34);
    });
  });

  describe("getDisplayedStopId", () => {
    it("should return the stop code if one is provided", () => {
      const place = {
        ...basePlace,
        stopCode: "code123",
        stopId: "xagency:id123"
      };
      expect(getDisplayedStopId(place)).toEqual("code123");
      const stop = {
        ...basePlace,
        code: "code123",
        id: "xagency:id123"
      };
      expect(getDisplayedStopId(stop)).toEqual("code123");
    });
    it("should return the id part of stopId it contains and agencyId (and no stopCode is provided)", () => {
      const place = {
        ...basePlace,
        stopId: "xagency:id123"
      };
      expect(getDisplayedStopId(place)).toEqual("id123");
      const stop = {
        ...basePlace,
        id: "xagency:id123"
      };
      expect(getDisplayedStopId(stop)).toEqual("id123");
    });
    it("should return the whole stopId it does not contain an agency part (and no stopCode is provided)", () => {
      const place = {
        ...basePlace,
        stopId: "wholeid123"
      };
      expect(getDisplayedStopId(place)).toEqual("wholeid123");
      const stop = {
        ...basePlace,
        stopId: "wholeid123"
      };
      expect(getDisplayedStopId(stop)).toEqual("wholeid123");
    });
    it("should return null if stopId is null (and no stopCode is provided)", () => {
      expect(getDisplayedStopId(basePlace)).toBeFalsy();
    });
  });

  describe("getLegCost", () => {
    it("should return the total cost for a leg", () => {
      const leg = {
        fareProducts: [
          {
            product: {
              medium: { id: "cash" },
              riderCategory: { id: "regular" },
              name: "rideCost",
              price: { amount: 200, currency: "USD" }
            }
          }
        ]
      };
      const result = getLegCost(leg, "cash", "regular");
      expect(result.price).toEqual({ amount: 200, currency: "USD" });
    });

    it("should return the transfer discount amount if a transfer was used", () => {
      const leg = {
        fareProducts: [
          {
            product: {
              medium: { id: "cash" },
              riderCategory: { id: "regular" },
              name: "rideCost",
              price: { amount: 200, currency: "USD" }
            }
          },
          {
            product: {
              name: "transfer",
              price: { amount: 50, currency: "USD" },
              medium: { id: "cash" },
              riderCategory: { id: "regular" }
            }
          }
        ]
      };
      const result = getLegCost(leg, "cash", "regular");
      expect(result.price).toEqual({ amount: 200, currency: "USD" });
      expect(result.transferAmount).toEqual({ amount: 50, currency: "USD" });
    });

    it("should return undefined if no fare products exist on the leg", () => {
      const leg = {};
      const result = getLegCost(leg, "cash", "regular");
      expect(result.price).toBeUndefined();
    });
  });
});
