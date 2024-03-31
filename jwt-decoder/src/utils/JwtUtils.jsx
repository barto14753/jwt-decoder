const jwt = require("jsonwebtoken");

const defaultSecret = "secret";
const defaultJwt = {
  sub: "1234567890",
  name: "John Doe",
  iat: 1516239022,
};

export const getDefaultJwt = () => {
  return encodeJwt(defaultJwt, defaultSecret);
};

export const encodeJwt = (payload, secret) => {
  return jwt.sign(payload, secret);
};

export const decodeJwt = (jwtString) => {
  try {
    return jwt.decode(jwtString, { complete: true });
  } catch (error) {
    return null;
  }
};

export const verifyJwt = (jwtString, secret) => {
  try {
    return jwt.verify(jwtString, secret);
  } catch (error) {
    return false;
  }
};
