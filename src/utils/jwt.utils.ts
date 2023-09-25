import jwt from "jsonwebtoken";

import config from "../configurations/default";

const privateKey = config.privateKey;
const publicKey = config.publicKey;

export function signJWT(object: Object, options?: jwt.SignOptions | undefined) {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
}

export function verifyJWT(token: string) {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message == "jwt token expired",
      decoded: null,
    };
  }
}
