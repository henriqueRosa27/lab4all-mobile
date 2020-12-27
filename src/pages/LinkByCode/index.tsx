import React, { FC } from "react";

import LinkByCodeProvider from "../../hooks/LinkByCodeContext";
import LinkByCodePage from "./page";



const LinkByCode: FC = () => {
  return (
    <LinkByCodeProvider>
      <LinkByCodePage />
    </LinkByCodeProvider>
  );
};

export default LinkByCode;
