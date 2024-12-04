const memberServices = require("../services/member.services");
const responseManager = require("../utility/responseManager");
const encryptionUtility = require("../utility/encryption");
const jwt = require("jsonwebtoken");

const signin = async (request, h) => {
  const payload = request.payload;
  const hasEmail = await memberServices.checkByEmail(request.payload.email);
  if (!hasEmail) {
    payload.password = await encryptionUtility.encryptText(payload.password);
    const res = await memberServices.insert(payload);
    return responseManager.success(h, "Member is Created", res);
  } else {
    return responseManager.error(h, "Email already exists", {}, 409);
  }
};
const login = async (request, h) => {
  try {
    const payload = request.payload;
    const userData = await memberServices.checkByEmail(request.payload.email);
    if (userData) {
      const checkPassword = await encryptionUtility.validateText(
        payload.password,
        userData.password
      );
      console.log("checkPassword", checkPassword);
      if (!checkPassword) {
        return responseManager.error(h, "Invalid Email or Password", {}, 401);
      }
      const token = jwt.sign({ _id: userData._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      let res = userData.toObject();
      delete res.password;
      res.token = token;
      return responseManager.success(h, "Member is Fetch", res);
    } else {
      return responseManager.error(h, "Invalid Email or Password", {}, 401);
    }
  } catch (error) {
    console.log("error", error);
  }
};

module.exports = { signin, login };
