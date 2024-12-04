const bcrypt = require("bcryptjs");

const encryptText = async (text) => {
  try {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(text, salt);
  } catch (error) {
    console.log("error in encryptText", error);
  }
};

const validateText = async (validateTo, validateWith) => {
  return await bcrypt.compare(validateTo, validateWith);
};

module.exports = { validateText, encryptText };
