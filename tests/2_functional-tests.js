const chaiHttp = require("chai-http");
const chai = require("chai");
let assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

suite("Functional Tests", () => {
  test("valid unit and num", () => {
    chai.request(server).get("/api/convert").query({input: "10L"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.initNum, 10);
      assert.strictEqual(res.body.initUnit, "L");
      assert.approximately(res.body.returnNum, 2.64712, 0.1);
      assert.strictEqual(res.body.returnUnit, "gal");
    });
  });
  test("invalid unit valid num", () => {
    chai.request(server).get("/api/convert").query({input: "32g"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.text, "invalid unit");
    });
  });
  test("invalid num valid unit", () => {
    chai.request(server).get("/api/convert").query({input: "3/7.2/4kg"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.text, "invalid number");
    });
  });
  test("invalid num and unit", () => {
    chai.request(server).get("/api/convert").query({input: "3/7.2/4kilomegagram"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.text, "invalid number and unit");
    });
  });
  test("no num", () => {
    chai.request(server).get("/api/convert").query({input: "kg"}).end((err, res) => {
      assert.strictEqual(res.status, 200);
      assert.strictEqual(res.body.initNum, 1);
      assert.strictEqual(res.body.initUnit, "kg");
      assert.approximately(res.body.returnNum, 2.20462, 0.1);
      assert.strictEqual(res.body.returnUnit, "lbs");
    });
  });
});
