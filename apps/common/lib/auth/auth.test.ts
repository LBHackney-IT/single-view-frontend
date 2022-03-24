import { config } from "../config";
import {
  $auth,
  AuthUser,
  isAuthorised,
  isAuthorisedForGroups,
  login,
  logout,
  processToken,
} from "./auth";
/*
 {
     "sub": "112895652611500752170",
     "email": "test@example.com",
     "iss": "Hackney",
     "name": "Tom Smith",
     "groups": ['TEST_GROUP']
  }
 */
const mockToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTI4OTU2NTI2MTE1MDA3NTIxNzAiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpc3MiOiJIYWNrbmV5IiwibmFtZSI6IlRvbSBTbWl0aCIsImdyb3VwcyI6WyJURVNUX0dST1VQIl0sImp0aSI6IjRlZmUyMDA4LTc4NmMtNDE1Ni05MGJhLTJjM2UxMzk4ZDhmNSIsImlhdCI6MTYxODgyOTA5NSwiZXhwIjoxNjE4ODMyNjk1fQ.uXfOvdv5JiUUfRNMHWpdYDfqdyf8bWmzD3G4ns3lJPQ";

Object.defineProperty(window.document, "cookie", {
  writable: true,
  value: "",
});

Object.defineProperty(window, "location", {
  value: {
    href: "http://localhost/",
    origin: "http://localhost",
    reload: jest.fn(),
  },
  writable: true,
});

let auth: AuthUser;

describe("auth", () => {
  beforeEach(() => {
    window.document.cookie = "";
    processToken();
    (window.location.reload as jest.Mock).mockReset();
  });

  test("user is not authenticated", () => {
    auth = $auth.getValue();
    expect(auth.token).toBe("");
    expect(isAuthorised()).toBe(false);
  });

  test("user is unauthenticated with incorrect cookie", () => {
    window.document.cookie = `hackneyToken=123456`;
    processToken();
    auth = $auth.getValue();

    expect(auth.token).toBe("");
    expect(isAuthorised()).toBe(false);
  });

  test("user is authenticated", () => {
    window.document.cookie = `hackneyToken=${mockToken}`;
    processToken();
    auth = $auth.getValue();

    expect(auth.token).toBe(mockToken);
    expect(auth.name).toBe("Tom Smith");
    expect(auth.email).toBe("test@example.com");
    expect(auth.groups).toContain("TEST_GROUP");
    expect(isAuthorised()).toBe(true);
    expect(isAuthorisedForGroups(["TEST_GROUP"])).toBe(true);
    expect(isAuthorisedForGroups(["not-a-users-group"])).toBe(false);
  });

  test("login clears state and redirects to auth", () => {
    window.document.cookie = `hackneyToken=${mockToken}`;
    processToken();
    login();
    auth = $auth.getValue();

    expect(auth.token).toBe("");
    expect(window.location.href).toContain(config.authDomain);
  });

  test("logout clears cookie and state", () => {
    window.document.cookie = `hackneyToken=${mockToken}`;
    processToken();
    auth = $auth.getValue();

    expect(auth.token).toBe(mockToken);
    logout();

    const { email, name, groups, token } = $auth.getValue();
    expect(token).toBe("");
    expect(email).toBe("");
    expect(name).toBe("");
    expect(groups).toEqual([]);
    expect(window.location.reload).toBeCalledTimes(1);
  });
});
