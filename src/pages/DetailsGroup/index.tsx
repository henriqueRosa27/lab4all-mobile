import React, { FC } from "react";

import DetailsGroupPage from "./page";
import DetailsGroupProvider from "../../hooks/DetailsGroupContext";

const ListActivities: FC = () => {
  return (
    <DetailsGroupProvider>
      <DetailsGroupPage />
    </DetailsGroupProvider>
  );
};

export default ListActivities;
