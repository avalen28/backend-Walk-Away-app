const isValid = (value, typeOfvalue) => {
  if (typeOfvalue === "boolean") {
    if (typeof value === "boolean") {
      return true;
    } else {
      return false;
    }
  } else if (typeOfvalue === "string") {
    if (typeof value === "string" && value.trim().length > 0) {
      return true;
    } else {
     
      return false;
    }
  } else if (typeOfvalue === "number") {
    if (typeof value === "number" && value >0) {
      return true;
    } else {
      
      return false;
    }
  } else if (typeOfvalue === "array") {
    if (typeof value === "object" && value.length > 0) {
      return true;
    } else {
      return false;
    }
  } else if (typeOfvalue === "email") {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    if (emailRegex.test(value)) {
      return true;
    } else {
      return false;
    }
  } else if (typeOfvalue === "password") {
    const passwordRegex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
    if (passwordRegex.test(value)) {
      return true;
    } else {
      return false;
    }
  } else if (typeOfvalue === "inventary") {
    if (
      typeof value === "object" &&
      value.drinks &&
      value.food &&
      value.sportswear &&
      value.footwear
    ) {
      return true;
    } else {
     
      return false;
    }
  } else if (typeOfvalue === "tips") {
    if (
      typeof value === "string" &&
      value.length <= 500 &&
      value.trim().length > 0
    ) {
      return true;
    } else {
      return false;
    }
  } else if (typeOfvalue === "food") {
    if (
      value === "Empty" ||
      value === "Lunch" ||
      value === "Snacks" ||
      value === "All day meal" ||
      value === "Two days meal"
    ) {
      return true;
    } else {

      return false;
    }
  } else if (typeOfvalue === "drinks") {
    if (
      value === "Empty" ||
      value === "1L." ||
      value === "1.5L." ||
      value === "2L." ||
      value === "Isotonic drink"
    ) {
      return true;
    } else {

      return false;
    }
  } else if (typeOfvalue === "sportswear") {
    if (
      value === "Empty" ||
      value === "Trekking clothes (spring weather)" ||
      value === "Moutain clothes(winter weather)" ||
      value === "High Mountain clothes" ||
      value === "Long Route"
    ) {
      return true;
    } else {

      return false;
    }
  } else if (typeOfvalue === "footwear") {
    if (
      value === "Empty" ||
      value === "Light boots or trekking slippers" ||
      value === "Moutain boots" ||
      value === "High Mountain boots"
    ) {
      return true;
    } else {

      return false;
    }
  }
};

module.exports = isValid;
