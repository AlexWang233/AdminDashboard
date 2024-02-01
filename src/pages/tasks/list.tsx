import {
  KanbanBoardContainer,
  KanbanBoard,
} from "@/components/tasks/kanban/board";
import KanbanColumn from "@/components/tasks/kanban/column";
import KanbanItem from "@/components/tasks/kanban/item";
import { TASKS_QUERY, TASK_STAGES_QUERY } from "@/graphql/queries";
import { useList } from "@refinedev/core";
import React from "react";

const List = () => {
  const { data: stages, isLoading: isLoadingStages } = useList({
    resource: "taskStages",
    filters: [
      {
        field: "title",
        operator: "in",
        value: ["TODO", "IN PROGRESS", "IN REVIEW", "DONE"],
      },
    ],
    sorters: [
      {
        field: "createdAt",
        order: "asc",
      },
    ],
    meta: {
      gqlQuery: TASK_STAGES_QUERY,
    },
  });
  const { data: tasks, isLoading: isLoadingTasks } = useList({
    resource: "tasks",
    sorters: [
      {
        field: "dueDate",
        order: "asc",
      },
    ],
    pagination: {
      mode: "off",
    },
    queryOptions: {
      enabled: !!stages,
    },
    meta: {
      gqlQuery: TASKS_QUERY,
    },
  });
  const taskStages = React.useMemo(() => {
    if (!tasks?.data || !stages?.data) {
      return {
        unassignedStage: [],
        stages: [],
      };
    }
  }, [stages, tasks]);
  return (
    <>
      <KanbanBoardContainer>
        <KanbanBoard>
          <KanbanColumn>
            <KanbanItem>My first Item</KanbanItem>
          </KanbanColumn>
          <KanbanColumn></KanbanColumn>
        </KanbanBoard>
      </KanbanBoardContainer>
    </>
  );
};

export default List;
