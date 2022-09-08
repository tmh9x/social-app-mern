import * as dotenv from "dotenv";

import jsonwebtoken from "jsonwebtoken";

dotenv.config();

const issueToken = (userId) => {
  const signOptions = {
    expiresIn: "5 h",
  };

  const payload = {
    sub: userId,
  };
  const jwt = jsonwebtoken.sign(
    payload,
    process.env.SECRET_OR_KEY,
    signOptions
  );
  return jwt;
};

export { issueToken };
