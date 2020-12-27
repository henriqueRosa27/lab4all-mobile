import React, { FC } from "react";

import ListGroupProvider from "../../hooks/ListGroupContext";
import GroupListPage from "./page";

const GroupList: FC = () => {
  return (
    <ListGroupProvider>
      <GroupListPage />
    </ListGroupProvider>
  );
};

export default GroupList;
