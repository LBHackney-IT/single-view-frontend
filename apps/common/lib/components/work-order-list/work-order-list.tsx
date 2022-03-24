import React, { useState } from "react";

import {
  REPAIR_FILTER_LIST,
  WorkOrdersFilters,
  useWorkOrders,
} from "../../api/work-order/v2";
import { config } from "../../config";
import locale from "../../locale";
import { CardList } from "../card-list";
import { Center } from "../center";
import { ErrorSummary } from "../error-summary";
import { FormGroup } from "../form-group";
import { Link } from "../link";
import { Select } from "../select";
import { Spinner } from "../spinner";
import WorkOrderListItem from "./work-order-list-item";
import "./work-order-list.scss";

const { components } = locale;
interface ExternalLinkProps {
  assetId: string;
}

const ExternalLink = ({ assetId }: ExternalLinkProps) => (
  <Link
    href={`${config.repairsHubAppUrl}/properties/${assetId}`}
    isExternal
    className="repair-list__link"
  >
    {components.workOrderList.seeAllWorkOrders}
  </Link>
);

interface WorkOrdersProps {
  assetId: string;
  statusCode: WorkOrdersFilters;
}

export const WorkOrders = ({ assetId, statusCode }: WorkOrdersProps) => {
  const { data: workOrders, error } = useWorkOrders(assetId, statusCode);

  if (error) {
    return (
      <ErrorSummary
        id="work-order-list-error"
        title={components.workOrderList.errors.unableToFetchWorkOrder}
        description={components.workOrderList.errors.unableToFetchWorkOrderDescription}
      />
    );
  }

  if (!workOrders) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  const getStatusLabel = (code: WorkOrdersFilters) => {
    const label = REPAIR_FILTER_LIST.find((item) => item.code === code)?.value;
    return label || code;
  };

  if (!workOrders.length) {
    return (
      <>
        <p className="repair-list__no-work-orders">
          {`${locale.components.workOrderList.noRepairs} ${getStatusLabel(statusCode)}`}
        </p>
        <ExternalLink assetId={assetId} />
      </>
    );
  }

  return (
    <div>
      <CardList>
        {workOrders.map((workOrder, index) => (
          <WorkOrderListItem key={index} workOrder={workOrder} />
        ))}
      </CardList>
      <ExternalLink assetId={assetId} />
    </div>
  );
};

interface WorkOrderListProps {
  assetId: string;
}

export const WorkOrderList = ({ assetId }: WorkOrderListProps) => {
  const [statusCode, setStatusCode] = useState(WorkOrdersFilters.IN_PROGRESS);
  return (
    <div className="work-order-list">
      <FormGroup id="filter" label={`${components.workOrderList.selectLabel}:`}>
        <Select
          value={statusCode}
          onChange={(e) => setStatusCode(e.target.value as WorkOrdersFilters)}
          data-testid="work-order-list:filter"
        >
          {REPAIR_FILTER_LIST?.map((filter, index) => (
            <option key={index} value={filter.code}>
              {components.workOrderList.selectOptionLabel} {filter.value}
            </option>
          ))}
        </Select>
      </FormGroup>
      <WorkOrders assetId={assetId} statusCode={statusCode} />
    </div>
  );
};
