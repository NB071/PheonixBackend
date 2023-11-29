const tryCatch = require("../../utils/tryCatch");

// import queries
const query = require("../../models/queries");
const jwtUtils = require("../../utils/jwt");

// Your controller functions go here...
const sampleLogin = tryCatch(async (req, res) => {
  const { email, password } = req.body;

  const user = await query.login(email, password);
  if (Object.keys(user).length !== 0) {
    const token = jwtUtils.generateAccessToken(user.id);
    return res.json({ token });
  } else {
    return res
      .status(401)
      .json({ status: "error", message: "email or password is incorrect" });
  }
});

module.exports = { sampleLogin };
