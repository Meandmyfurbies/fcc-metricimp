const numberStringSplitter = (input) => {
  const number = input.match(/[.\d\/]+/g) || ["1"];
  const string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
}

const checkDiv = (possibleFraction) => {
  const nums = possibleFraction.split("/");
  if(nums.length > 2) return false;
  return nums;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = numberStringSplitter(input)[0];
    const nums = checkDiv(result);
    if(!nums) {
      return undefined;
    }
    const num1 = nums[0];
    const num2 = nums[1] || "1";
    result = parseFloat(num1) / parseFloat(num2);
    if(isNaN(num1) || isNaN(num2)) {
      return undefined;
    }
    return result;
  };
  
  this.getUnit = function(input) {
    const result = numberStringSplitter(input)[1].toLowerCase();
    switch(result) {
      case "gal":
        return "gal";
      case "l":
        return "L";
      case "mi":
        return "mi";
      case "km":
        return "km";
      case "lbs":
        return "lbs";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    const result = initUnit.toLowerCase();
    switch(result) {
      case "gal":
        return "L";
      case "l":
        return "gal";
      case "mi":
        return "km";
      case "km":
        return "mi";
      case "lbs":
        return "kg";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    const result = unit.toLowerCase();
    switch(result) {
      case "gal":
        return "gallons";
      case "l":
        return "liters";
      case "mi":
        return "miles";
      case "km":
        return "kilometers";
      case "lbs":
        return "pounds";
      case "kg":
        return "kilograms";
      default:
        return "don't know";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    const unit = initUnit.toLowerCase();
    let result;
    switch(unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
