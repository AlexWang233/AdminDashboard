import CustomAvatar from "@/components/custom-avatar";
import SelectOptionWithAvatar from "@/components/select-option-with-avatar";
import { UPDATE_COMPANY_MUTATION } from "@/graphql/mutations";
import { USERS_SELECT_QUERY } from "@/graphql/queries";
import { UsersSelectQuery } from "@/graphql/types";
import { getNameInitials } from "@/utilities";
import { Edit, useForm, useSelect } from "@refinedev/antd";
import { GetFieldsFromList } from "@refinedev/nestjs-query";
import { Col, Form, Row, Select } from "antd";
import React from "react";

export const EditPage = () => {
  const { selectProps, queryResult: queryResultUsers } = useSelect<
    GetFieldsFromList<UsersSelectQuery>
  >({
    resource: "users",
    optionLabel: "name",
    meta: {
      gqlQuery: USERS_SELECT_QUERY,
    },
  });
  const { saveButtonProps, formProps, formLoading, queryResult } = useForm({
    redirect: false,
    meta: {
      gqlMutation: UPDATE_COMPANY_MUTATION,
    },
  });
  const { avatarUrl, name } = queryResult?.data?.data || {};
  return (
    <div>
      <Row gutter={[32, 32]}>
        <Col xs={24} xl={12}>
          <Edit
            isLoading={formLoading}
            saveButtonProps={saveButtonProps}
            breadcrumb={false}
          >
            <Form {...formProps} layout="vertical">
              <CustomAvatar
                shape="square"
                src={avatarUrl}
                name={getNameInitials(name || "")}
                style={{ width: 96, height: 96, marginBottom: "24px" }}
              />
              <Form.Item
                label="Sales owner"
                name="salesOwnerId"
                initialValue={formProps?.initialValues?.salesOwner?.id}
              >
                <Select
                  {...selectProps}
                  options={
                    queryResultUsers.data?.data.map((user) => ({
                      value: user.id,
                      label: (
                        <SelectOptionWithAvatar
                          name={user.name}
                          avatarUrl={user.avatarUrl ?? undefined}
                        />
                      ),
                    })) ?? []
                  }
                  placeholder="Select sales owner here"
                />
              </Form.Item>
            </Form>
          </Edit>
        </Col>
      </Row>
    </div>
  );
};
