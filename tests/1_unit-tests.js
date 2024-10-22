const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", () => {
  suite("Helper functions", () => {
    test("Whole number", () => {
      assert.strictEqual(convertHandler.getNum("18L"), 18);
    });
    test("Decimal", () => {
      assert.strictEqual(convertHandler.getNum("18.5L"), 18.5);
    });
    test("Fractional", () => {
      assert.strictEqual(convertHandler.getNum("1/2L"), 1 / 2);
    });
    test("Fractional with decimal", () => {
      assert.strictEqual(convertHandler.getNum("3/1.5L"), 3 / 1.5);
    });
    test("Double fraction", () => {
      assert.isUndefined(convertHandler.getNum("1/2/3L"));
    });
    test("No number", () => {
      assert.strictEqual(convertHandler.getNum("L"), 1);
    });
    test("Valid input units", () => {
      const inputs = ["18 L", "18 gal", "18 mi", "18 km", "18 lbs", "18 kg"];
      const expect = ["L", "gal", "mi", "km", "lbs", "kg"];
      for(let i = 0; i < inputs.length; i++) {
        assert.strictEqual(convertHandler.getUnit(inputs[i]), expect[i]);
      }
    });
    test("Invalid input unit", () => {
      assert.isUndefined(convertHandler.getUnit("18 g"));
    });
    test("Return unit", () => {
      const inputs = ["L", "gal", "mi", "km", "lbs", "kg"];
      const expect = ["gal", "L", "km", "mi", "kg", "lbs"];
      for(let i = 0; i < inputs.length; i++) {
        assert.strictEqual(convertHandler.getReturnUnit(inputs[i]), expect[i]);
      }
    });
    test("Spelled out unit", () => {
      const inputs = ["L", "gal", "mi", "km", "lbs", "kg"];
      const expect = ["liters", "gallons", "miles", "kilometers", "pounds", "kilograms"];
      for(let i = 0; i < inputs.length; i++) {
        assert.strictEqual(convertHandler.spellOutUnit(inputs[i]), expect[i]);
      }
    });
  });
  suite("Conversion", () => {
    test("gal to L", () => {
      assert.strictEqual(convertHandler.convert("18", "gal"), 68.13738);
    });
    test("L to gal", () => {
      assert.strictEqual(convertHandler.convert("18", "L"), 4.7551);
    });
    test("mi to km", () => {
      assert.strictEqual(convertHandler.convert("18", "mi"), 28.96812);
    });
    test("km to mi", () => {
      assert.strictEqual(convertHandler.convert("18", "km"), 11.18471);
    });
    test("lbs to kg", () => {
      assert.strictEqual(convertHandler.convert("18", "lbs"), 8.16466);
    });
    test("kg to lbs", () => {
      assert.strictEqual(convertHandler.convert("18", "kg"), 39.68324);
    });
  });
});
