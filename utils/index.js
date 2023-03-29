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
    if (typeof value === "number") {
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
  }
};

module.exports = isValid;
