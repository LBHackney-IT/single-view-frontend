import { stringify } from "query-string";

import { $auth } from "@mtfh/common/lib/auth";
import { config } from "@mtfh/common/lib/config";
import {
  AxiosSWRInfiniteConfiguration,
  AxiosSWRInfiniteResponse,
  axiosInstance,
  useAxiosSWRInfinite,
} from "@mtfh/common/lib/http";

import type { Comment } from "./types";

export interface CommentsResponse {
  results: Comment[];
  paginationDetails: {
    nextToken: string | null;
  };
}

export interface GetCommentsRequestData {
  targetId: string;
  pageSize?: number;
}

export interface CommentsRequestParams extends GetCommentsRequestData {
  paginationToken?: string | null;
}

export interface CommentsConfiguration
  extends AxiosSWRInfiniteConfiguration<CommentsResponse> {
  pageSize?: number;
}

export const useComments = (
  id: string | null,
  { pageSize = 5, ...options }: CommentsConfiguration = {},
): AxiosSWRInfiniteResponse<CommentsResponse> => {
  return useAxiosSWRInfinite<CommentsResponse>((page, previous) => {
    if (!id || (previous && !previous?.paginationDetails?.nextToken)) {
      return null;
    }

    const params: CommentsRequestParams = {
      targetId: id,
      pageSize,
    };

    if (page !== 0 && previous?.paginationDetails.nextToken) {
      params.paginationToken = previous.paginationDetails.nextToken;
    }

    return `${config.notesApiUrlV2}/notes?${stringify(params)}`;
  }, options);
};

export type PostCommentRequestData = Omit<Comment, "id" | "author" | "createdAt">;

export const addComment = async (data: PostCommentRequestData): Promise<Comment> => {
  const auth = $auth.getValue();
  const { data: comment } = await axiosInstance.post(`${config.notesApiUrlV2}/notes`, {
    ...data,
    createdAt: new Date().toISOString(),
    author: {
      id: auth.sub,
      email: auth.email,
      fullName: auth.name,
    },
  });
  return comment;
};
