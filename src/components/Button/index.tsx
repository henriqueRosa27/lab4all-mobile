import React, { FC, ReactNode } from "react";
import { Button as ButtonBase } from "react-native-paper";

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  enabled?: boolean;
  mode?: "text" | "outlined" | "contained";
  loading?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  onPress,
  enabled = true,
  mode = "contained",
  loading = false
}: ButtonProps) => {
  return (
    <ButtonBase
      mode={mode}
      style={{ borderRadius: 20, marginTop: 32 }}
      disabled={!enabled}
      loading={loading}
      contentStyle={{ height: 56 }}
      labelStyle={{ fontSize: 30 }}
      onPress={onPress}>
      {children}
    </ButtonBase>
  );
};

export default Button;
