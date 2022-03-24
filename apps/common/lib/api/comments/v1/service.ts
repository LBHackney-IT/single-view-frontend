import { stringify } from "query-string";

import { $auth } from "@mtfh/common/lib/auth";
import { config } from "@mtfh/common/lib/config";
import {
  AxiosSWRInfiniteResponse,
  axiosInstance,
  useAxiosSWRInfinite,
} from "@mtfh/common/lib/http";

import type { Comment } from "./types";

export interface GetCommentsByTargetIdResponse {
  results: Comment[];
  paginationDetails: {
    nextToken: string | null;
  };
}

export interface GetCommentsByIdRequestData {
  targetId: string;
  pageSize?: number;
  paginationToken?: string | null;
}

export const useComments = (
  id: string,
  pageSize = 5,
): AxiosSWRInfiniteResponse<GetCommentsByTargetIdResponse> => {
  return useAxiosSWRInfinite<GetCommentsByTargetIdResponse>((page, previous) => {
    if (previous && !previous?.paginationDetails?.nextToken) {
      return null;
    }

    const params: GetCommentsByIdRequestData = {
      targetId: id,
      pageSize,
    };

    if (page !== 0 && previous?.paginationDetails.nextToken) {
      params.paginationToken = previous.paginationDetails.nextToken;
    }

    return `${config.notesApiUrlV1}/notes?${stringify(params)}`;
  });
};

export type PostCommentRequestData = Omit<
  Comment,
  "id" | "categorisation" | "author" | "createdAt"
>;

export const addComment = async (data: PostCommentRequestData): Promise<Comment> => {
  const auth = $auth.getValue();
  const { data: comment } = await axiosInstance.post(`${config.notesApiUrlV1}/notes`, {
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
