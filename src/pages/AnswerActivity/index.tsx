import React, { FC } from "react";

import AnswerActivityPage from "./page";
import AnswerActivityProvider from "../../hooks/AnswerActivityContext";

const AnswerActivity: FC = () => {
  return (
    <AnswerActivityProvider>
      <AnswerActivityPage />
    </AnswerActivityProvider>
  );
};

export default AnswerActivity;
