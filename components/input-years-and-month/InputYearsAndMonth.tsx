import React, { useState, useRef } from "react";
import { View, Text } from "react-native";
import Slider from "@react-native-community/slider";
import styles from "./styles";
type InputYearsAndMonthProps = {
  setYears: (years: number) => void;
  setMonths: (months: number) => void;
  years: number;
  months: number;
};
export const InputYearsAndMonth: React.FC<InputYearsAndMonthProps> = ({
  setYears,
  setMonths,
  years,
  months,
}) => {
  const yearsRef = useRef(years);
  const monthsRef = useRef(months);
  return (
    <View style={styles.container}>
      <View style={styles.sliderContainer}>
        <Text>Years of Experience: {years}</Text>
        <Slider
          style={styles.slider}
          value={years}
          onValueChange={(value: any) => {
            yearsRef.current = value;
          }}
          onSlidingComplete={() => {
            setYears(yearsRef.current);
          }}
          minimumValue={0}
          maximumValue={50}
          step={1}
          minimumTrackTintColor="#1FB28A"
          maximumTrackTintColor="#D3D3D3"
        />
      </View>
      <View style={styles.sliderContainer}>
        <Text>Months of Experience: {months}</Text>
        <Slider
          style={styles.slider}
          value={months}
          onValueChange={(value: any) => {
            monthsRef.current = value;
          }}
          onSlidingComplete={() => {
            setMonths(monthsRef.current);
          }}
          minimumValue={0}
          maximumValue={11}
          step={1}
          minimumTrackTintColor="#1FB28A"
          maximumTrackTintColor="#D3D3D3"
        />
      </View>
    </View>
  );
};
