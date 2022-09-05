const { SignJWT } = require("jose");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const Todo = require("../models/todo");

const loginUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: { username },
      include: Todo,
    });
    if (!user) return res.status(401).send();
    let passwordSave = await bcrypt.compare(password, user.password);
    if (!passwordSave) return res.status(401).send();
    const encoder = new TextEncoder();
    const jwtContructor = new SignJWT({ id: user.id });
    const jwt = await jwtContructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    res.send({ jwt, todos: user.todos });
  } catch (error) {
    return res.status(401).send(error.message);
  }
};

const postUser = async (req, res) => {
  const { username, password } = req.body;
  try {
    let passwordHash = await bcrypt.hash(
      password,
      parseInt(process.env.ROUNDS)
    );
    const newUser = await User.findOrCreate({
      where: { username, password: passwordHash },
    });
    const encoder = new TextEncoder();
    const jwtContructor = new SignJWT({ id: newUser[0].id });
    const jwt = await jwtContructor
      .setProtectedHeader({ alg: "HS256", typ: "JWT" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));

    res.send({ jwt });
  } catch (error) {
    res.status(400).send(error.message);
  }
};
module.exports = { loginUser, postUser };
