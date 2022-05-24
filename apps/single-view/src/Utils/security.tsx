import JSEncrypt from "jsencrypt";

export const encrypt = (value: string, publicKey: string) => {
  const crypt = new JSEncrypt();
  crypt.setKey(publicKey);
  const encrypted = crypt.encrypt(value);

  return encrypted;
};
