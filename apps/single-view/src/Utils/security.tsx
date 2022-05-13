import crypto from "crypto";

const algorithm = "aes-256-ctr";
const ivLength = 16;

// TODO: Get from ssm
const key = "GVitnm.QjsXUYjTTJ@_@.hAr-Lh2GVAX"; // 32 bytes
// const iv = crypto.randomBytes(16)
const iv = "aaaaaaaaaaaaaaaa";

export const encrypt = (value: string) => {
  // let iv = crypto.randomBytes(16);
  let cipher = crypto.createCipheriv(algorithm, key, iv);
  let encrypted = cipher.update(value);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return iv + ":" + encrypted.toString("hex");
};

export const decrypt = (value: string) => {
  // let iv = Buffer.from(value.split(":").shift() || "", "hex");
  // console.log(iv);
  let encryptedText = Buffer.from(value, "hex");
  let decipher = crypto.createDecipheriv(algorithm, key, iv);
  let decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
};
