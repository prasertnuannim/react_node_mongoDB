import crypto from "crypto";

const SECRET = 'SERT-REST_API' 
export const random = () => crypto.randomBytes(128).toString("base64")
export const authentication = (self: string, password: string) => {
    return crypto.createHmac("sha256",[self, password].join('/')).update(SECRET).digest("hex");
}
