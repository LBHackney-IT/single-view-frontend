import crypto from "crypto";

const algo = "aes-256-cbc";

export const encrypt = (value: string, key: string, iv: string) => {
  const cipher = crypto.createCipheriv(algo, key, iv);
  const encrypted = cipher.update(value);
  return Buffer.concat([encrypted, cipher.final()]).toString("base64");
};
