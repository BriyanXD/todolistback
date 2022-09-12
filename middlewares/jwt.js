const { jwtVerify } = require("jose");
const User = require("../models/user");

const getLoginUser = async (req, res, next) => {
  const { authorization } = req.headers;
  try {
    if (!authorization) return res.status(401);
    const encoder = new TextEncoder();
    const token = authorization.split(" ")[1];
    const jwtData = await jwtVerify(
      token,
      encoder.encode(process.env.JWT_PRIVATE_KEY)
    );
    const verifyUser = await User.findByPk(jwtData.payload.id);
    if (!verifyUser) return res.status(401).send();
    next();
  } catch (error) {
    res.status(401).send({ message: error.message });
  }
};

module.exports = getLoginUser;
