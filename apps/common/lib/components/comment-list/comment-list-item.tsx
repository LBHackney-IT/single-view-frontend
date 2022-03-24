import React, { useMemo } from "react";

import cn from "classnames";

import type { Comment } from "@mtfh/common/lib/api/comments/v2";
import { formatDate, formatTime } from "@mtfh/common/lib/utils";

import type { ReferenceData } from "../../api/reference-data/v1";

import "./comment-list-item.scss";

export interface CommentListItemParameters {
  comment: Comment;
  categories: ReferenceData[];
}

const getCategoryLabel = (categoryCode: string, categories: ReferenceData[]) => {
  const category = categories.find((cat) => cat.code === categoryCode);
  return category?.value;
};

export const CommentListItem = ({
  comment: { categorisation, createdAt, title, description, author, highlight },
  categories,
}: CommentListItemParameters): JSX.Element => {
  const createdAtDate = useMemo(() => formatDate(createdAt), [createdAt]);
  const createdAtTime = useMemo(() => formatTime(createdAt), [createdAt]);
  return (
    <div className="comment">
      <div className="comment__item">
        <div className="comment__date-time">{createdAtDate}</div>
        <div className="comment__date-time">{createdAtTime}</div>
      </div>
      <div className="comment__item --center">
        {title && (
          <div className={cn("comment__title", { "--highlight": highlight })}>
            {title}
          </div>
        )}
        {categorisation?.category && (
          <div className="comment__category">
            {getCategoryLabel(categorisation.category, categories)}
          </div>
        )}
        {description}
      </div>
      <div className="comment__item">{author.fullName}</div>
    </div>
  );
};
