const { jwtVerify } = require("jose");
const User = require("../models/user");

const getLoginUser = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401);
    const encoder = new TextEncoder();
    const jwtData = await jwtVerify(
      authorization,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    const verifyUser = await User.findByPk(jwtData.payload.id);
    if (!verifyUser) return res.status(401);
    next();
  } catch (error) {
    res.status(401).send(error.message);
  }
};

module.exports = getLoginUser;
