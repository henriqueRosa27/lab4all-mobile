import React, { FC } from "react";
import {
  TextInput as TextInputRN,
  Text,
  KeyboardTypeOptions
} from "react-native";
import { Controller, Control, RegisterOptions } from "react-hook-form";

import styles from "./styles";

interface TextInputProps {
  label: string;
  defaultValue?: string | undefined;
  control: Control<Record<string, unknown>>;
  name: string;
  rules?: Exclude<
    RegisterOptions,
    "valueAsNumber" | "valueAsDate" | "setValueAs"
  >;
  placeholder: string;
  autoCompleteType?:
    | "cc-csc"
    | "cc-exp"
    | "cc-exp-month"
    | "cc-exp-year"
    | "cc-number"
    | "email"
    | "name"
    | "password"
    | "postal-code"
    | "street-address"
    | "tel"
    | "username"
    | "off";
  keyboardType?: KeyboardTypeOptions;
  editable: boolean;
  secureTextEntry?: boolean;
  error?: string | undefined;
  showSoftInputOnFocus?: boolean;
  isLowerCase?: boolean;
  autoCapitalize?: "none" | "sentences" | "words" | "characters";
}

const TextInput: FC<TextInputProps> = ({
  label,
  defaultValue = undefined,
  control,
  name,
  rules,
  placeholder,
  autoCompleteType,
  editable,
  keyboardType,
  secureTextEntry = false,
  error,
  showSoftInputOnFocus = true,
  isLowerCase = false,
  autoCapitalize = undefined
}: TextInputProps) => {
  return (
    <>
      <Text
        style={[
          styles.label,
          error ? styles.labelColorError : styles.labelColor
        ]}>
        {label}
      </Text>

      <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        rules={rules}
        render={({ value, onChange }) => (
          <TextInputRN
            style={[
              styles.input,
              error ? styles.inputBorderError : styles.inputBorder,
              isLowerCase && styles.lowerCase
            ]}
            placeholder={placeholder}
            autoCompleteType={autoCompleteType}
            keyboardType={keyboardType}
            editable={editable}
            value={value}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            onChangeText={(value: string) => {
              onChange(value);
            }}
            showSoftInputOnFocus={showSoftInputOnFocus}
          />
        )}
      />
      {error && (
        <Text style={[styles.labelError, styles.labelColorError]}>{error}</Text>
      )}
    </>
  );
};

export default TextInput;
