import React, { FC } from "react";
import {  KeyboardTypeOptions } from "react-native";
import { Controller, Control, RegisterOptions } from "react-hook-form";
import { TextInput as TextInputBase, HelperText } from "react-native-paper";

interface TextInputProps {
  label: string;
  defaultValue?: string | undefined | null;
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
  multiline?: boolean;
  numberOfLines?: number;
}

const TextInput: FC<TextInputProps> = ({
  label,
  defaultValue = null,
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
  autoCapitalize = undefined,
  multiline = undefined,
  numberOfLines = undefined
}: TextInputProps) => {
  return (
    <>
      <Controller
        defaultValue={defaultValue}
        control={control}
        name={name}
        rules={rules}
        render={({ value, onChange }) => (
          <TextInputBase
            style={[
              isLowerCase && { textTransform: "lowercase" },
              !multiline && { height: 56 }
            ]}
            error={Boolean(error)}
            label={label}
            placeholder={placeholder}
            mode="outlined"
            autoCompleteType={autoCompleteType}
            keyboardType={keyboardType}
            editable={editable}
            value={value}
            autoCapitalize={autoCapitalize}
            secureTextEntry={secureTextEntry}
            onChangeText={(value: string) => {
              onChange(value);
            }}
            multiline={multiline}
            numberOfLines={numberOfLines}
            showSoftInputOnFocus={showSoftInputOnFocus}
          />
        )}
      />
      <HelperText
        type="error"
        style={{ fontSize: 14 }}
        visible={Boolean(error)}>
        {error}
      </HelperText>
    </>
  );
};

export default TextInput;
