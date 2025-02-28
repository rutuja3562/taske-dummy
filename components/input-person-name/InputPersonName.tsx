import React, { useState } from "react";
import { View, Text, Dimensions, TextInput } from "react-native";
import { styles } from "./styles";
import CloseIcon from "@/assets/svg-icons/CloseIcon";

interface InputPersonNameProps {
  nameValue: string;
  onNameChange: (name: string) => void;
  clearName: () => void;
}
export const InputPersonName: React.FC<InputPersonNameProps> = ({
  nameValue,
  onNameChange,
  clearName,
}) => {
  return (
    <View>
      <TextInput
        style={styles.input}
        placeholder="Enter your name"
        value={nameValue}
        onChangeText={onNameChange}
      />
      {nameValue.length > 0 ? (
        <CloseIcon style={styles.closeCircle} onPress={clearName} />
      ) : null}
    </View>
  );
};
