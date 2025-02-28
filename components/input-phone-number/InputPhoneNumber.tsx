import React, { useState } from "react";
import { View, TextInput } from "react-native";
import { styles } from "./styles";
import CloseIcon from "@/assets/svg-icons/CloseIcon";

interface InputPhoneNumberProps {
  phoneValue: string;
  onPhoneChange: (phone: string) => void;
  clearPhone: () => void;
}
export const InputPhoneNumber: React.FC<InputPhoneNumberProps> = ({
  phoneValue,
  onPhoneChange,
  clearPhone,
}) => {
  return (
    <View>
      <TextInput
        style={[styles.input]}
        placeholder="Enter 10 digit mobile number"
        maxLength={10}
        keyboardType="phone-pad"
        placeholderTextColor="#535252"
        onChangeText={onPhoneChange}
        value={phoneValue}
      />
      {phoneValue.length > 0 ? (
        <CloseIcon style={styles.closeCircle} onPress={clearPhone} />
      ) : null}
    </View>
  );
};
