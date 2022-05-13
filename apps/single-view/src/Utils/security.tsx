import crypto from "crypto";

const algo = "aes-256-ctr";

// TODO: Get from SSM
const key = "GVitnm.QjsXUYjTTJ@_@.hAr-Lh2GVAX"; // 32 bytes
const iv = "J@_@.hAr-Lh2GVAX"; // 16 bytes

export const encrypt = (value: string) => {
  const cipher = crypto.createCipheriv(algo, key, iv);
  const encrypted = cipher.update(value);
  return Buffer.concat([encrypted, cipher.final()]).toString("hex");
};

export const decrypt = (value: string) => {
  const decipher = crypto.createDecipheriv(algo, key, iv);
  const decrypted = decipher.update(Buffer.from(value, "hex"));
  return Buffer.concat([decrypted, decipher.final()]).toString();
};
