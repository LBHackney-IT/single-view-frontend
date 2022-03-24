import React from "react";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { $auth, logout } from "@mtfh/common/lib/auth";

import Root from "./root.component";

const mockUser = {
  token:
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIxMTI4OTU2NTI2MTE1MDA3NTIxNzAiLCJlbWFpbCI6InRlc3RAZXhhbXBsZS5jb20iLCJpc3MiOiJIYWNrbmV5IiwibmFtZSI6IlRvbSBTbWl0aCIsImdyb3VwcyI6WyJURVNUX0dST1VQIl0sImp0aSI6IjRlZmUyMDA4LTc4NmMtNDE1Ni05MGJhLTJjM2UxMzk4ZDhmNSIsImlhdCI6MTYxODgyOTA5NSwiZXhwIjoxNjE4ODMyNjk1fQ.uXfOvdv5JiUUfRNMHWpdYDfqdyf8bWmzD3G4ns3lJPQ",
  email: "test@example.com",
  name: "Tom Smith",
  groups: ["TEST_GROUP"],
  sub: "112895652611500752170",
  iss: "Hackney",
  iat: 1234,
};

jest.mock("@mtfh/common/lib/auth", () => {
  const originalModule = jest.requireActual("@mtfh/common/lib/auth");
  return {
    ...originalModule,
    logout: jest.fn(),
  };
});

describe("Root component", () => {
  it("should be in the document", () => {
    render(<Root />);
    expect(screen.getByText("Manage my Home")).toBeInTheDocument();
  });

  it("should show sign in for unauthorised users", () => {
    render(<Root />);
    expect(screen.getByText("Sign in")).toBeInTheDocument();
  });

  it("should show authenticated users name", () => {
    $auth.next(mockUser);
    render(<Root />);
    expect(screen.getByText("Tom Smith")).toBeInTheDocument();
  });

  it("signing out should revert to unauthorised state", () => {
    $auth.next(mockUser);
    render(<Root />);
    const signOut = screen.getByText("Sign out");
    userEvent.click(signOut);
    expect(logout).toHaveBeenCalledTimes(1);
  });
});
