import React, { useState } from "react";
import { View, Text, Dimensions, TextInput } from "react-native";
import CustomCheckBox from "../custom-check-box/CustomCheckBox";
import { styles } from "./styles";

interface InputTnCProps {
  text: string;
  checkBoxText: string;
}

export const InputTnC: React.FC<InputTnCProps> = ({ text, checkBoxText }) => {
  const [isChecked, setIsChecked] = useState(false);
  const onCheckBoxPreesed = () => {
    console.log("onCheckBoxPreesed");
    setIsChecked(!isChecked);
  };
  return (
    <View>
      <Text style={styles.tncText}>{text}</Text>
      <View style={styles.checkBoxContainer}>
        <CustomCheckBox checked={isChecked} onPress={onCheckBoxPreesed} />
        <Text style={styles.checkBoxText}>{checkBoxText}</Text>
      </View>
    </View>
  );
};
