import { encrypt } from "./security";

const mockSetKey = jest.fn();
const mockEncrypt = jest.fn();

jest.mock("jsencrypt", () => {
  return jest.fn(() => {
    return {
      setKey: mockSetKey,
      encrypt: mockEncrypt,
    };
  });
});

describe("security", () => {
  describe("encrypt", () => {
    it("should return a string", () => {
      const key = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz1xzhzn9ulK";
      const textToEncrypt = '{"username": "testUser", "password": "pa$$w0rd"}';

      encrypt(textToEncrypt, key);

      expect(mockSetKey.mock.calls.length).toBe(1);
      expect(mockSetKey.mock.calls[0][0]).toBe(key);

      expect(mockEncrypt.mock.calls.length).toBe(1);
      expect(mockEncrypt.mock.calls[0][0]).toBe(textToEncrypt);
    });
  });
});
