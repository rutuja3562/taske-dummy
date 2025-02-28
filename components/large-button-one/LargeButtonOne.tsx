//---------------------------------------------------------------------------------
// File: /components/large-button/LargeButton.tsx
//---------------------------------------------------------------------------------
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

//---------------------------------------------------------------------------------

function LargeButtonOne({
  onButtonPress,
  buttonText,
  disabled = false,
}: {
  onButtonPress: () => void;
  buttonText: string;
  disabled?: boolean;
}) {
  return (
    <View style={styles.buttonContainer}>
      <TouchableOpacity
        style={[
          styles.button,
          disabled ? styles.buttonInvalid : styles.buttonValid,
        ]}
        onPress={onButtonPress}
        disabled={disabled}
      >
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
}

//---------------------------------------------------------------------------------

export default LargeButtonOne;

//---------------------------------------------------------------------------------
