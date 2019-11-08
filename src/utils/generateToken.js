import jwt from "jsonwebtoken";

const generateToken = userID => {
  const token = jwt.sign({ userId: userID }, process.env.JWT_SECRET, {
    expiresIn: "7 days"
  });
  return token;
};

export { generateToken as default };
