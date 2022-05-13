import { decrypt, encrypt } from "./security";

describe("security", () => {
  describe("encrypt", () => {
    it("should return a string", () => {
      const encryptedText = encrypt("text");
      expect(typeof encryptedText).toBe("string");
    });
  });

  describe("decrypt", () => {
    it("should return a string", () => {
      const encryptedText = encrypt("text");
      expect(typeof decrypt(encryptedText)).toBe("string");
    });

    it("should return the same value that was passed to encrypt", () => {
      const value = "testValue";
      const encryptedText = encrypt(value);
      expect(decrypt(encryptedText)).toBe(value);
    });
  });
});
