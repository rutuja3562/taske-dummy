import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import {
  CodeField,
  Cursor,
  useBlurOnFulfill,
  useClearByFocusCell,
} from "react-native-confirmation-code-field";
import { styles } from "./styles";
const { width, height } = Dimensions.get("window");

interface InputOtpProps {
  otpValue: string;
  handleOtpChange: (otp: string) => void;
}
export const InputOtp: React.FC<InputOtpProps> = ({
  otpValue,
  handleOtpChange,
}) => {
  const CELL_COUNT = 6;

  return (
    <View style={[styles.otpCont]}>
      <CodeField
        // ref={ref}
        // {...props}
        value={otpValue}
        onChangeText={handleOtpChange}
        cellCount={CELL_COUNT}
        rootStyle={styles.otpContainer}
        keyboardType="number-pad"
        textContentType="oneTimeCode"
        renderCell={({ index, symbol, isFocused }: any) => (
          <View
            key={index}
            style={[styles.cell, isFocused && styles.focusCell]}
            // onLayout={getCellOnLayoutHandler(index)}
          >
            <Text style={styles.cellText}>
              {symbol || (isFocused ? <Cursor /> : null)}
            </Text>
          </View>
        )}
      />
    </View>
  );
};
