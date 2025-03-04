import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { styles } from "./styles";
import CloseIcon from "@/assets/svg-icons/CloseIcon";
import { Color } from "@/assets/theme";

interface InputPhoneNumberProps {
  phoneValue: string;
  onPhoneChange: (phone: string) => void;
  clearPhone: () => void;
  onFocusInput: () => void;
  isFocused: boolean;
  setIsFocused: (isFocused: boolean) => void;
}
export const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
  phoneValue,
  onPhoneChange,
  clearPhone,
  isFocused,
  onFocusInput,
  setIsFocused,
}) => {
  return (
    <View style={styles.PhoneInputContainer}>
      <TextInput
        style={[
          styles.input,
          isFocused
            ? {
                borderColor: Color.Purple,
                borderLeftColor: Color.Purple,
                // borderLeftWidth: 1,
                // borderTopLeftRadius: BorderRadius.countryCodeBorderRadius,
                // borderBottomLeftRadius: BorderRadius.countryCodeBorderRadius,
              }
            : {
                borderColor: Color?.LightGrey,
                borderLeftColor: Color?.LightGrey,
              },
        ]}
        placeholder="Enter 10 digit mobile number"
        maxLength={10}
        keyboardType="phone-pad"
        placeholderTextColor="#535252"
        onChangeText={onPhoneChange}
        value={phoneValue}
        onFocus={onFocusInput}
        onBlur={() => {
          setIsFocused(false);
          // onPhoneBlur();
        }}
      />
      {phoneValue.length > 0 ? (
        <CloseIcon style={styles.closeCircle} onPress={clearPhone} />
      ) : null}
    </View>
  );
};
