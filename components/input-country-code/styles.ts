import { StyleSheet } from "react-native";
import { BorderRadius, Color, Font, FontSize, Margin } from "@/assets/theme"; // Ensure these exist

export const styles = StyleSheet.create({
  countryCode: {
    backgroundColor: Color.LightPurple,
    // paddingHorizontal: Margin.InterElementsSpaceLarge,
    borderTopLeftRadius: BorderRadius.countryCodeBorderRadius,
    borderBottomLeftRadius: BorderRadius.countryCodeBorderRadius,
    justifyContent: "center",
    alignItems: "center",
    height: 52,
    borderColor: Color.LightGrey,
    borderWidth: 1,
    width: 60,
  },
  countryCodeText: {
    fontSize: FontSize.BodyCopy,
    color: Color.VeryDarkGrey,
  },
});
