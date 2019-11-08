import jwt from "jsonwebtoken";

const getUserId = (token, requireAuth = true) => {
  console.log(token);
  if (token) {
    const tokenBearer = "Bearer " + token;
    const decoded = jwt.verify(tokenBearer, process.env.JWT_SECRET);
    return decoded.userId;
  }

  if (requireAuth) {
    throw new Error("Authentication required");
  }

  return null;
};

export { getUserId as default };
