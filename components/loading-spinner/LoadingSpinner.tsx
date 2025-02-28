import { View, Text, ActivityIndicator } from "react-native";
import React from "react";
import { styles } from "./styles";
import { Color } from "@/assets/theme";

const LoadingSpinner = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={Color.Purple} />
    </View>
  );
};

export default LoadingSpinner;
