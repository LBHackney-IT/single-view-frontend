import { encrypt } from "./security";

describe("security", () => {
  describe("encrypt", () => {
    it("should return a string", () => {
      const key = "GVitnm.QjsXUYjTTJ@_@.hAr-Lh2GVAX";
      const iv = "J@_@.hAr-Lh2GVAX";

      const encryptedText = encrypt(
        '{"username": "testUser", "password": "lkjahf43jht"}',
        key,
        iv
      );
      expect(encryptedText).toBe(
        "9JXbsm6zx5QFg7eUKIfxk8A+ZBGn+snIWDmSjLQNBUYVquE71prAbMhn4IoGqqoDz9zDjs7To547TjXdzajBsA=="
      );
    });
  });
});
