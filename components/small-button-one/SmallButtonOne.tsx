import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { styles } from "./styles";

interface SmallButtonOneProps {
  icon?: React.ComponentType;
  buttonText: string;
  onButtonPress: () => void;
}

const SmallButtonOne = ({
  icon: Icon,
  buttonText,
  onButtonPress,
}: SmallButtonOneProps) => {
  return (
    <TouchableOpacity style={[styles.button]} onPress={onButtonPress}>
      <Text style={styles.buttonText}>{buttonText}</Text>
    </TouchableOpacity>
  );
};

export default SmallButtonOne;
