import React from "react";

import { render, testA11y } from "@hackney/mtfh-test-utils";
import { screen, waitFor } from "@testing-library/react";
import { act, renderHook } from "@testing-library/react-hooks";

import { PageAnnouncementProvider, usePageAnnouncement } from "./context";
import { PageAnnouncement } from "./page-announcement";

test("it renders correctly", async () => {
  const { container } = render(
    <PageAnnouncement heading="Announcement" description="A description" />,
  );
  expect(container).toMatchSnapshot();
  await testA11y(container);
});

test("it applies the correct variant", () => {
  const { container } = render(
    <PageAnnouncement heading="Announcement" variant="warning" />,
  );
  expect(container).toMatchSnapshot();
});

test("it does not render if no context or heading", () => {
  const { container } = render(<PageAnnouncement variant="warning" />);
  expect(container).toMatchSnapshot();
});

test("it can initialise with session storage", async () => {
  window.sessionStorage.setItem("test:heading", "Session Heading");
  window.sessionStorage.setItem("test:description", "Session Description");
  window.sessionStorage.setItem("test:variant", "info");
  render(
    <PageAnnouncementProvider sessionKey="test">
      <PageAnnouncement />
    </PageAnnouncementProvider>,
  );
  await waitFor(() =>
    expect(screen.getByRole("heading")).toHaveTextContent("Session Heading"),
  );
  expect(window.sessionStorage.getItem("test:heading")).toBe(null);
});

test("it wont render if session storage is empty", () => {
  const { container } = render(
    <PageAnnouncementProvider sessionKey="test">
      <PageAnnouncement />
    </PageAnnouncementProvider>,
  );
  expect(container).toMatchSnapshot();
});

test("it can set the context with usePageAnnouncement", () => {
  const wrapper: React.FC = ({ children }) => (
    <PageAnnouncementProvider>{children}</PageAnnouncementProvider>
  );
  const { result } = renderHook(() => usePageAnnouncement(), { wrapper });

  act(() => {
    result.current.addAnnouncement({
      heading: "Hook Heading",
      variant: "info",
    });
  });

  expect(result.current.state).toStrictEqual({
    heading: "Hook Heading",
    variant: "info",
  });

  act(() => {
    result.current.clearAnnouncement();
  });

  expect(result.current.state).toBe(undefined);
});

test("it throws an error when using usePageAnnouncement outside of the provider", () => {
  const { result } = renderHook(() => usePageAnnouncement());
  expect(result.error).toEqual(
    Error(
      "usePageAnnouncementContext: `context` is undefined. Seems you forgot to wrap component within the Provider",
    ),
  );
});
