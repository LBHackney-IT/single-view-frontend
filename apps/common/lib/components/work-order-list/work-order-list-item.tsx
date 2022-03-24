import React, { useMemo } from "react";

import cn from "classnames";

import { formatDate } from "@mtfh/common/lib/utils";

import { WorkOrder } from "../../api/work-order/v2";
import { config } from "../../config";
import locale from "../../locale";
import { Card, CardBreak, CardRows } from "../card";
import { Link } from "../link";
import { LinkBox, LinkOverlay } from "../link-box";

import "./work-order-list-item.scss";

export interface WorkOrderListItemParameters {
  workOrder: WorkOrder;
}

const DESCRIPTION_LENGTH = 50;

const WorkOrderListItem = ({
  workOrder: { dateRaised, priority, tradeDescription, status, description, reference },
}: WorkOrderListItemParameters): JSX.Element => {
  const { components } = locale;
  const dateRaisedAt = useMemo(() => formatDate(dateRaised), [dateRaised]);

  const rows = [
    { value: dateRaisedAt, label: components.workOrderList.raisedAt },
    { value: priority, label: components.workOrderList.priority },
  ];
  return (
    <LinkBox>
      <Card>
        <LinkOverlay>
          <Link
            className="lbh-link"
            isExternal
            href={`${config.repairsHubAppUrl}/work-orders/${reference}`}
          >
            <span
              className={cn({
                "work-order-list-item__trim": description.length > DESCRIPTION_LENGTH,
              })}
            >
              {tradeDescription}: {description.substring(0, DESCRIPTION_LENGTH)}
            </span>
          </Link>
        </LinkOverlay>
        <CardRows rows={rows} />
        <CardBreak />
        <div className="work-order-list-item__status"> {status}</div>
      </Card>
    </LinkBox>
  );
};

export default WorkOrderListItem;
