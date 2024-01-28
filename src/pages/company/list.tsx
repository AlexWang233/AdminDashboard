import { COMPANIES_LIST_QUERY } from "@/graphql/queries";
import { SearchOutlined } from "@ant-design/icons";
import { CreateButton, List, useTable } from "@refinedev/antd";
import { getDefaultFilter, useGo } from "@refinedev/core";
import { Table } from "antd";
import React from "react";

export const CompanyList = () => {
  const go = useGo();
  const { tableProps, filters } = useTable({
    resource: "companies",
    pagination: {
      pageSize: 12,
    },
    meta: {
      gqlQuery: COMPANIES_LIST_QUERY,
    },
  });
  return (
    <List
      breadcrumb={false}
      headerButtons={() => (
        <CreateButton
          onClick={() => {
            go({
              to: {
                resource: "companies",
                action: "create",
              },
              options: {
                keepQuery: true,
              },
              type: "replace",
            });
          }}
        />
      )}
    >
      <Table {...tableProps} pagination={{ ...tableProps.pagination }}>
        <Table.Column
          dataIndex="name"
          title="Company Title"
          defaultFilteredValue={getDefaultFilter("id", filters)}
          filterIcon={<SearchOutlined />}
        ></Table.Column>
      </Table>
    </List>
  );
};
