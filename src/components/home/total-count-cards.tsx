import { Card } from "antd";
import React from "react";

type Props = {
  resource: "companies" | "contacts" | "deals";
  isLoading: boolean;
  totalCount: number;
};

const DashboardTotalCountCard = ({
  resource,
  isLoading,
  totalCount,
}: Props) => {
  return (
    <Card
      style={{ height: "96px", padding: 0 }}
      bodyStyle={{ padding: "8px 8px 8px 12px" }}
      size="small"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          whiteSpace: "nowrap",
        }}
      ></div>
    </Card>
  );
};

export default DashboardTotalCountCard;
