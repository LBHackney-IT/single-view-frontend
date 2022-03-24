import React from "react";

import {
  getCommentV2,
  getReferenceDataV1,
  mockCommentV2,
  render,
  server,
} from "@hackney/mtfh-test-utils";
import { screen, waitFor, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import locale from "../../locale";
import { mockCategoryReferenceDataV1, mockCommentsV2 } from "../../test-utils";
import { formatDate, formatTime } from "../../utils";
import { CommentList } from "./comment-list";

test("it renders correctly", async () => {
  render(<CommentList targetId="123" />);
  await waitFor(() => expect(screen.queryByText(/Loading/)).not.toBeInTheDocument());

  await screen.findByText(mockCommentsV2[0].author.fullName);
  await screen.findByText(mockCommentsV2[0].title || "");
  await screen.findByText(mockCategoryReferenceDataV1[0].value);
  await screen.findByText(formatDate(mockCommentsV2[0].createdAt));
  await screen.findByText(formatTime(mockCommentsV2[0].createdAt));
});

test("it renders no comments with no results", async () => {
  server.use(getCommentV2("not found", 404));
  render(<CommentList targetId="123" />);
  await waitForElementToBeRemoved(screen.queryByText(/Loading/));

  await screen.findByText(/No comments/);
});

test("it pages the results", async () => {
  render(<CommentList targetId="123" />);
  await waitForElementToBeRemoved(screen.queryByText(/Loading/));

  userEvent.click(screen.getByText(/Next/));
  await screen.findByText("Comment title 6");

  userEvent.click(screen.getByText(/Previous/));

  await screen.findByText("Comment title 1");
});

test("it does not render pagination unnecessarily", async () => {
  server.use(getCommentV2([mockCommentV2]));

  render(<CommentList targetId="123" />);

  await waitFor(() => expect(screen.queryByText(/Next/)).toBe(null));
});

test("it shows an error if reference data fails", async () => {
  server.use(getReferenceDataV1({}, 400));

  render(<CommentList targetId="123" />);

  await screen.findByText(
    locale.components.commentList.errors.unableToFetchReferenceData,
  );
});
