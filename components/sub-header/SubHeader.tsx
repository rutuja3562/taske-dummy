import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { styles } from "./styles";

interface SubHeaderProps {
  title: string;
  iconComponent?: React.ReactNode;
  onButtonPress?: () => void;
}

export const SubHeader: React.FC<SubHeaderProps> = ({
  title,
  iconComponent,
  onButtonPress,
}) => {
  return (
    <View style={styles.header}>
      <Text style={styles.completeProfileText}>{title}</Text>
      <TouchableOpacity
        onPress={() =>
          onButtonPress ? onButtonPress() : console.log("No action")
        }
      >
        <View style={styles.userProfile}>{iconComponent}</View>
      </TouchableOpacity>
    </View>
  );
};
