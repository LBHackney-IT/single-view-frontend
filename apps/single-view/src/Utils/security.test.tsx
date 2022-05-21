import { encrypt } from "./security";

describe("security", () => {
  describe("encrypt", () => {
    it("should return a string", () => {
      const key =
        "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAz1xzhzn9ulK+rQ0gOCb/\n" +
        "xzquQgelF8BGtyXRiMqs0hLbwDSGsmNm27l7+ZJ4FyUEWz7WBQdpXg7GKgqU4JOo\n" +
        "5z/rS5L2CtYxMv09G0JL28GSeCKbmKyc0FU7XXuFXT52E6MAHAEX8A8It7PkQxnY\n" +
        "n7GF0T5BOzrTE/lJGvrZ9SNbvTholxthdy7EyNSoTGwqplc64xLK/puEWnDqBeXs\n" +
        "cPBKUnqkTCtjCi8v16f+u5qQ3Pvo6IWq8BhPLP0OttTG1dGm8hT0V8oRsXs1ueU6\n" +
        "bdGySzcZhHHraidNjR0DD0cCGj5wtJv6uGJt5IjTwtgkwqXzC1PjgbreLSnmESqx\n" +
        "bwIDAQAB";

      const encryptedText = encrypt(
        '{"username": "testUser", "password": "pa$$w0rd"}',
        key
      );
      expect(encryptedText).toBe(
        "e9AfdDArc1+Bw/D9eBAsT4WBrUc3VSjnUIgdDa+NrwFjwIYUyupVfxDXjy8Ju0LPNlIcxDlmL6AvC2PlIcJ1h0WvAiaX9SG4C7mu+mYeCb/bJjJKIOScDCaNrvdRiFcwDs3azjXB2S4N5efPRauv7NGaZDxyllVv0sJwNMt9BVPYkvanXnmRIYFm15YSPI7qYB+VmC1xmoLSdpeBQFOhT6B90kGSFK3ZUcc2xhzkNJbpfSHqOeb8jG/xMD6Lk97O1kF0dbZFhfUHwCAcnwNJCYJ0SxqSIc7JGt/Xg0Nx2sD929YDgst6L/nZ/DYuZnqAHmT5Zv8wL1/ZCjlXhb7rxw=="
      );
    });
  });
});
