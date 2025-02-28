import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Color } from "@/assets/theme";
import TickMark from "@/assets/svg-icons/TickMark";

const CustomCheckBox = ({
  checked,
  onPress,
}: {
  checked: boolean;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.customCheckbox,
        {
          backgroundColor: checked ? Color.Purple : Color.VeryLightGrey,
          borderColor: checked ? Color.Purple : Color.LightGrey,
          borderWidth: 1,
        },
      ]}
    >
      {checked && <TickMark />}
    </TouchableOpacity>
  );
};

export default CustomCheckBox;
