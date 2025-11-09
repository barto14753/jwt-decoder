# JWT Decoder

![Deployment](https://github.com/barto14753/jwt-decoder/actions/workflows/actions.yml/badge.svg)

[![](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)]()
[![](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)]()
[![](https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white)]()

## Project Description

The JWT Decoder is a web application built with React and Material UI that allows you to decode and verify JSON Web Tokens (JWTs). It provides a user-friendly interface for decoding JWTs, displaying their contents, and verifying signatures using various key formats.

## Features

- **Decode JWTs**: Enter a JWT and the application will decode it and display the header and payload information.
- **Encode to JWT**: Update header and payload data to receive new JWT
- **JWT Verification**: Verify JWT signatures using different key formats:
  - Public Key (PEM format)
  - JWK (JSON Web Key)
  - JWKS (JSON Web Key Set) endpoint
  - X.509 Certificates
  - Default application certificate
- **Key Management**: Load verification keys from:
  - Text input
  - File upload (.pem, .crt, .key, .pub, .json, .jwk)
  - Remote JWKS endpoints
- **Multiple Algorithms**: Support for HMAC (HS256, HS384, HS512) and RSA (RS256, RS384, RS512) algorithms
- **Real-time Validation**: Live verification status with detailed error messages

## Demo

Check out the live demo of the JWT Decoder at [barto14753.github.io/jwt-decoder](https://barto14753.github.io/jwt-decoder).

<img width="1507" alt="image" src="https://github.com/barto14753/jwt-decoder/assets/56938330/12606105-773b-4feb-be00-cdeb8f6160de">

## Usage

To use the JWT Decoder, follow these steps:

1. Clone the repository: `git clone https://github.com/barto14753/jwt-decoder.git`
2. Navigate to project directory: `cd jwt-decoder/jwt-decoder`
3. Install dependencies: `npm install`
4. Start the development server: `npm start`
5. Open your browser and navigate to `http://localhost:3000/jwt-decoder`

### JWT Verification

The application includes comprehensive JWT verification capabilities:

#### Default Verification

- Uses the application's built-in certificate for RS256 tokens
- Falls back to "secret" for HMAC tokens

#### Loading Verification Keys

1. **Public Key**: Paste or upload a PEM-formatted public key
2. **JWK**: Enter a JSON Web Key in JSON format
3. **JWKS Endpoint**: Provide a URL to a JWKS endpoint (e.g., `https://domain.com/.well-known/jwks.json`)
4. **Certificate**: Upload an X.509 certificate (.pem, .crt format)

## Docker

You can also run the JWT Decoder using Docker. To do this, follow these steps:

```
# Build the Docker image
docker build -t jwt-decoder .

# Run the Docker container
docker run -d -p 3000:3000 jwt-decoder
```
