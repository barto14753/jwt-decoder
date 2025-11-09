import axios from 'axios';
import { DEFAULT_PRIVATE_KEY, DEFAULT_PUBLIC_KEY, DEFAULT_JWK } from './DefaultKeys';

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

export const verifyJwt = (jwtString, secret = defaultSecret) => {
	try {
		jwt.verify(jwtString, secret);
		return null;
	} catch (error) {
		return error;
	}
};

// Nowe funkcje dla weryfikacji z kluczami publicznymi
export const verifyJwtWithPublicKey = (jwtString, publicKey) => {
	try {
		jwt.verify(jwtString, publicKey, { algorithms: ['RS256', 'RS384', 'RS512'] });
		return null;
	} catch (error) {
		return error;
	}
};

export const verifyJwtWithJWK = async (jwtString, jwk) => {
	try {
		// Konwertuj JWK na PEM
		const publicKey = await convertJWKToPEM(jwk);
		return verifyJwtWithPublicKey(jwtString, publicKey);
	} catch (error) {
		return error;
	}
};

export const verifyJwtWithJWKS = async (jwtString, jwksUrl) => {
	try {
		// Pobierz JWKS
		const response = await axios.get(jwksUrl);
		const jwks = response.data;
		
		// Dekoduj JWT aby uzyskać kid
		const decoded = jwt.decode(jwtString, { complete: true });
		if (!decoded || !decoded.header) {
			throw new Error('Invalid JWT format');
		}
		
		const kid = decoded.header.kid;
		let jwk = null;
		
		if (kid) {
			// Znajdź JWK z odpowiednim kid
			jwk = jwks.keys.find(key => key.kid === kid);
		} else {
			// Użyj pierwszego dostępnego klucza
			jwk = jwks.keys[0];
		}
		
		if (!jwk) {
			throw new Error('No suitable key found in JWKS');
		}
		
		return verifyJwtWithJWK(jwtString, jwk);
	} catch (error) {
		return error;
	}
};

const convertJWKToPEM = async (jwk) => {
	try {
		// Użyj node-forge do konwersji JWK na PEM
		const forge = require('node-forge');
		
		if (jwk.kty !== 'RSA') {
			throw new Error('Only RSA keys are supported');
		}
		
		// Dekoduj base64url
		const base64urlDecode = (str) => {
			str = (str + '===').slice(0, str.length + (str.length % 4));
			str = str.replace(/-/g, '+').replace(/_/g, '/');
			return forge.util.decode64(str);
		};
		
		const n = base64urlDecode(jwk.n);
		const e = base64urlDecode(jwk.e);
		
		// Utwórz klucz publiczny RSA
		const rsaPublicKey = forge.pki.rsa.setPublicKey(
			new forge.jsbn.BigInteger(forge.util.bytesToHex(n), 16),
			new forge.jsbn.BigInteger(forge.util.bytesToHex(e), 16)
		);
		
		// Konwertuj na PEM
		const publicKeyPem = forge.pki.publicKeyToPem(rsaPublicKey);
		return publicKeyPem;
	} catch (error) {
		throw new Error('Failed to convert JWK to PEM: ' + error.message);
	}
};

export const parseJWK = (jwkString) => {
	try {
		return JSON.parse(jwkString);
	} catch (error) {
		throw new Error('Invalid JWK format');
	}
};

export const parseCertificate = (certString) => {
	try {
		// Sprawdź czy to jest PEM certificate
		if (!certString.includes('-----BEGIN CERTIFICATE-----')) {
			throw new Error('Invalid certificate format');
		}
		return certString;
	} catch (error) {
		throw new Error('Invalid certificate format');
	}
};

export const convertCertificateToPublicKey = async (certificate) => {
	try {
		// Używamy node-forge do konwersji certyfikatu na klucz publiczny
		const forge = require('node-forge');
		const cert = forge.pki.certificateFromPem(certificate);
		const publicKeyPem = forge.pki.publicKeyToPem(cert.publicKey);
		return publicKeyPem;
	} catch (error) {
		throw new Error('Failed to extract public key from certificate');
	}
};

export const getDefaultKeys = () => {
	return {
		privateKey: DEFAULT_PRIVATE_KEY,
		publicKey: DEFAULT_PUBLIC_KEY,
		jwk: DEFAULT_JWK
	};
};
