import React, { FC, ReactNode } from "react";
import { RectButton } from "react-native-gesture-handler";

import styles from "./styles";

interface ButtonProps {
  children: ReactNode;
  onPress: () => void;
  enabled?: boolean;
}

const Button: FC<ButtonProps> = ({
  children,
  onPress,
  enabled = true
}: ButtonProps) => {
  return (
    <RectButton style={styles.button} onPress={onPress} enabled={enabled}>
      {children}
    </RectButton>
  );
};

export default Button;
