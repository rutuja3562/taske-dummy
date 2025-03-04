import React, { useState } from "react";
import { View, Text, Dimensions, TextInput } from "react-native";
import { styles } from "./styles";
import { BorderRadius, Color } from "@/assets/theme";

interface InputCountryCodeProps {
  setCountryCode: (code: string) => void;
  countryCode: string;
  onChangeountryCode: () => void;
  isFocused: boolean;
}

export const InputCountryCode: React.FC<InputCountryCodeProps> = ({
  setCountryCode,
  countryCode,
  onChangeountryCode,
  isFocused,
}) => {
  return (
    <View
      style={[
        styles.countryCode,
        isFocused
          ? {
              borderColor: Color.Purple,
              borderLeftColor: Color.Purple,
              borderLeftWidth: 1,
              borderRightWidth: 0,
              borderTopLeftRadius: BorderRadius.countryCodeBorderRadius,
              borderBottomLeftRadius: BorderRadius.countryCodeBorderRadius,
            }
          : {
              borderColor: Color?.LightGrey,
              borderLeftColor: Color?.LightGrey,
            },
      ]}
    >
      <Text style={styles.countryCodeText}>+91</Text>
      {/* <TextInput
        style={styles.countryCodeText}
        value={countryCode}
        onChangeText={() => setCountryCode(countryCode)}
        keyboardType="numeric"
        maxLength={3}
        placeholderTextColor={Color.VeryDarkGrey}
        onFocus={onChangeountryCode}
      /> */}
    </View>
  );
};
