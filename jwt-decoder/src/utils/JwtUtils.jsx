const jwt = require("jsonwebtoken");

const defaultSecret = "secret";
const defaultHeader = {
	typ: "JWT",
	alg: "HS512",
};
const defaultPayload = {
	sub: "1234567890",
	name: "John Doe",
	iat: 1516239022,
};

export const getDefaultJwt = () => {
	return encodeJwt(defaultHeader, defaultPayload, defaultSecret);
};

export const encodeJwt = (header, payload, secret) => {
	return jwt.sign(payload, secret, { header });
};

export const decodeJwt = (jwtString) => {
	return jwt.decode(jwtString, { complete: true });
};

export const verifyJwt = (jwtString, secret) => {
	try {
		jwt.verify(jwtString, secret);
		return;
	} catch (error) {
		return error;
	}
};
