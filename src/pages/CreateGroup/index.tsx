import React, { FC } from "react";

import CreateGroupPage from "./page";
import CreateGroupProvider from "../../hooks/CreateGroupContext";

const CreateGroup: FC = () => {
  return (
    <CreateGroupProvider>
      <CreateGroupPage />
    </CreateGroupProvider>
  );
};

export default CreateGroup;
